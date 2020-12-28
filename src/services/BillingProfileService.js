import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/Loader/startLoader";
import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));

export class BillingProfileService {

    static requestProfiles() {

        store.dispatch(startLoader());

        const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            store.dispatch(finishLoader());
            return;
        }

        axios.get("/api/billing-profile", { params: { userToken } })
            .then(response => {
                store.dispatch(finishLoader(response.data));
            })
            .catch(err => {
                store.dispatch(startSnackBar("error", "Ha ocurrido un error en la carga de perfiles"));
                store.dispatch(finishLoader());
            });
    }

    static postNewProfile(profile) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                resolve();
                return;
            }

            return axios.post("/api/billing-profile", { profile }, { params: { userToken } })
                .then(response => {
                    store.dispatch(startSnackBar("success", "Perfil guardado satisfactoriamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(startSnackBar("error", "No ha sido posible guardar el perfil"));
                    resolve();
                });
        });
    }

    static deleteProfile(profile) {

        const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            return;
        }

        axios.delete("/api/billing-profile", { params: { userToken, profileID: profile._id }})
            .then(response => {
                store.dispatch(startSnackBar("success", "Perfil eliminado sin problemas"));
                BillingProfileService.requestProfiles();
            })
            .catch(err => {
                store.dispatch(startSnackBar("error", "No se ha podido eliminar el perfil"));
            });
    }
}

export default BillingProfileService;
