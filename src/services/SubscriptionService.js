import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import UsersService from "./UsersService";
import store from "../redux/store";

export class SubscriptionService {
    
    static postSubscription(billingProfile, products, stripe, payment_method_id, cardElement) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
            }

            return axios.post("/api/subscription", {
                billingProfile,
                subscription: {
                    products,
                    payment_method_id
                },
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
                }).catch(err =>{
                    store.dispatch(startSnackBar("error", '¡Ha habido un error! ' + err));
                });
        });
    }
}


export default SubscriptionService;