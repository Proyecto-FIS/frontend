import axios from "axios";
import getAllDeliveries from "../redux/actions/getAllDeliveries";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));

export class DeliveriesService {

    requestAllDeliveries = () => {
        axios.get("/api/deliveries")
            .then(response => store.dispatch(getAllDeliveries(response.data)))
    }

    static newDelivery(delivery) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            return axios.post("/api/deliveries", { delivery }, { params: { userToken } })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Entrega iniciada satisfactoriamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No ha sido posible iniciar la entrega"));
                    reject();
                });
        });
    }

    static editDelivery(delivery) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            return axios.put("/api/deliveries", { delivery }, { params: { userToken } })
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

export default DeliveriesService;