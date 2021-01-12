import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import UsersService from "./UsersService";
import store from "../redux/store";

export class PaymentService {

    static postPayment(billingProfile, products, stripe, cardElement) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
            }

            return axios.post("http://localhost:3001/api/v1/payment", {
                billingProfile,
                payment: {
                    products
                }
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
                    if (result.error || result.paymentIntent.status !== "succeeded") {
                        store.dispatch(startSnackBar("error", '¡Ha habido un error! ' + result.error.message));
                        reject();
                    } else {
                        store.dispatch(startSnackBar("success", "Pago realizado satisfactoriamente"));
                        resolve();
                    }
                });
        });
    }

    static postSubscription(billingProfile, products, stripe, cardElement) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
            }

            return axios.post("http://localhost:3001/api/v1/subscription", {
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

export default PaymentService;