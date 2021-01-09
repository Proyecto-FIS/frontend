import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import UsersService from "./UsersService";
import store from "../redux/store";
import { CardElement } from "@stripe/react-stripe-js";

export class PaymentService {

    static postPayment(billingProfile, products, stripe, elements) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
            }

            return axios.post("http://localhost:3001/api/v1/payment", {
                billingProfile,
                products
            }, { params: { userToken } })
                .then(res => {
                    return stripe.confirmCardPayment(res.data.client_secret, {
                        payment_method: {
                            card: elements.getElement(CardElement),
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

    static async postSubscription(payment_method, email, billing_profile_id) {
        /*const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            throw ("ERROR no authenticated");
            return;
        }

        return axios.post("http://localhost:3001/api/v1/subscription", {
            "payment": {
                email,
                payment_method,
                billing_profile_id
            }
        }, {
            params: {
                userToken
            }
        });*/
    }
}

export default PaymentService;