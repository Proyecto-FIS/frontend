import axios from "axios";
import getAllDeliveries from "../redux/actions/Delivery/getAllDeliveries";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";
import startLoader from "../redux/actions/Delivery/load";
import finishLoader from "../redux/actions/Delivery/done";
import UsersService from "./UsersService";

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));

export class DeliveriesService {

    requestAllDeliveries = () => {
        axios.get("/api/deliveries")
            .then(response => store.dispatch(getAllDeliveries(response.data)))
    }

    static requestDeliveries() {

        store.dispatch(startLoader());

        const userToken = UsersService.getUserToken();
        if (!userToken) {
            store.dispatch(finishLoader());
            return;
        }

        axios.get("/api/deliveries", { params: { userToken } })
            .then(response => {
                store.dispatch(finishLoader(response.data));
            })
            .catch(err => {
                store.dispatch(startSnackBar("error", "Ha ocurrido un error en la carga de deliveries"));
                store.dispatch(finishLoader());
            });
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
                    store.dispatch(startSnackBar("success", "Entrega actualizado correctamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No ha sido posible actualizar la entrega"));
                    reject();
                });
        });
    }

}

export default DeliveriesService;