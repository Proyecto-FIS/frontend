import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/Loader/startLoader";
import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";
import UsersService from "./UsersService";

export class BillingProfileService {

    static requestProfiles() {

        store.dispatch(startLoader());

        const userToken = UsersService.getUserToken();
        if (!userToken) {
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

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
                return;
            }

            return axios.post("/api/billing-profile", { profile }, { params: { userToken } })
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

    static deleteProfile(profile) {

        return new Promise((resolve, reject) => {
            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
                return;
            }

            axios.delete("/api/billing-profile", { params: { userToken, profileID: profile._id } })
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

    static editProfile(profile) {
        return new Promise((resolve, reject) => {

            const userToken = UsersService.getUserToken();
            if (!userToken) {
                reject();
                return;
            }

            return axios.put("/api/billing-profile", { profile }, { params: { userToken } })
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

export default BillingProfileService;
