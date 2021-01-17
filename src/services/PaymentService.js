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

            return axios.post("/api/payment", {
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
                }).catch(err =>{
                    store.dispatch(startSnackBar("error", '¡Ha habido un error! ' + err));
                });
        });
    }
}

export default PaymentService;