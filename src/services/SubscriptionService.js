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
                .then(result => {
                    if (result.error) {
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

    static deleteSubscription(transaction_id) {

        return new Promise((resolve, reject) => {
            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
                return;
            }

            axios.delete("/api/subscription", { params: { userToken, subscriptionID: transaction_id } })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Subscripción eliminada correctamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No se ha podido eliminar la subscripción"));
                    reject();
                });
        });
    }

}


export default SubscriptionService;