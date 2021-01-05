import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/Loader/startLoader";
import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));

export class SubscriptionService {

    static requestSubscriptions() {

        store.dispatch(startLoader());

        const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            store.dispatch(finishLoader());
            return;
        }

        axios.get("/api/subscription", {
                params: {
                    userToken
                }
            })
            .then(response => {
                store.dispatch(finishLoader(response.data));
            })
            .catch(err => {
                store.dispatch(startSnackBar("error", "Ha ocurrido un error en la carga de perfiles"));
                store.dispatch(finishLoader());
            });
    }

    static postNewSubscription(subscription) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            return axios.post("/api/subscription", {
                    subscription
                }, {
                    params: {
                        userToken
                    }
                })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Perfil guardado satisfactoriamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No ha sido posible guardar el perfil"));
                    reject();
                });
        });
    }

    static deleteSubscription(subscription) {

        return new Promise((resolve, reject) => {
            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            axios.delete("/api/subscription", {
                    params: {
                        userToken,
                        subscriptionID: subscription._id
                    }
                })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Perfil eliminado sin problemas"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No se ha podido eliminar el perfil"));
                    reject();
                });
        });
    }

    static editSubscription(subscription) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            return axios.put("/api/subscription", {
                    subscription
                }, {
                    params: {
                        userToken
                    }
                })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Perfil actualizado correctamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No ha sido posible actualizar el perfil"));
                    reject();
                });
        });
    }
}

export default SubscriptionService;