import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import UsersService from "./UsersService";
import store from "../redux/store";
import startLoader from "../redux/actions/Subscription/load";
import finishLoader from "../redux/actions/Subscription/done";

const addProductsData = (subscriptions) => {

    // Get all product identifiers
    let productIDs = {};
    subscriptions.forEach(subscription => {
        subscription.products.forEach(product => {
            productIDs[product._id] = {};
        });
    });

    // Get every needed product only once
    const promises = Object.keys(productIDs).map(productId => {
        return axios.get("/api/products", { params: { productId } })
            .then(response => response.data)
            .then(data => ({ _id: productId, name: data.name, imageUrl: data.imageUrl }));
    });

    // Map every product to its subscription
    return Promise.all(promises)
        .then(products => {
            for (let i = 0; i < subscriptions.length; i++) {
                subscriptions[i].timestamp = new Date(subscriptions[i].timestamp);
                for (let j = 0; j < subscriptions[i].products.length; j++) {
                    const matchingProduct = products.find(prod => prod._id === subscriptions[i].products[j]._id);
                    subscriptions[i].products[j] = { ...subscriptions[i].products[j], ...matchingProduct };
                }
            }
            return subscriptions;
        });
};
export class SubscriptionService {
    
    static getSubscription(pageSize, beforeTimestamp) {
        return new Promise((resolve, reject) => {

            store.dispatch(startLoader());

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                store.dispatch(finishLoader());
                reject();
                return;
            }

            return axios.get("/api/subscription", { params: { userToken, beforeTimestamp, pageSize } })
                .then(response => addProductsData(response.data))
                .then(data => {
                    store.dispatch(finishLoader(data));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "Ha ocurrido un error cargando las subscripciones"));
                    store.dispatch(finishLoader());
                    reject();
                });
        });
    }

    static postSubscription(billingProfile, products, stripe, cardElement) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
            }

            return axios.post("/api/subscription", {
                billingProfile,
                subscription: {
                    products
                },
                cardElement
            }, { params: { userToken } })
                .then(res => {
                    return stripe.confirmCardPayment(res.data.client_secret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                email: billingProfile.email,
                            },
                        },
                    });

                    
                })
                .then(result => {
                    if (result.error || result.data.status !== "requires_action") {// TODO: revisar requires_action
                        store.dispatch(startSnackBar("error", '¡Ha habido un error! ' + result.error.message));
                        reject();
                    } else {
                        store.dispatch(startSnackBar("success", "Subscripción realizada satisfactoriamente"));
                        resolve();
                    }
                });
        });
    }
}


export default SubscriptionService;