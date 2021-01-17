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

            return axios.post("http://localhost:3001/api/v1/subscription", {
                billingProfile,
                subscription: {
                    products,
                    payment_method_id
                },
            }, { params: { userToken } })
                .then(res => {
                    return stripe.confirmCardPayment(res.data.client_secret);
                })
                .then(result => {
                    if (result.error) {// TODO: revisar requires_action
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

    static deleteSubscription(profile) {

        return new Promise((resolve, reject) => {
            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
                return;
            }

            axios.delete("http://localhost:3001/api/v1/subscription", { params: { userToken, profileID: profile._id } })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Subscripcion eliminado sin problemas"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No se ha podido eliminar la subscripcion"));
                    reject();
                });
        });
    }

}


export default SubscriptionService;