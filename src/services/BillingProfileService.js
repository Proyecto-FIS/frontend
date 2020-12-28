import axios from "axios";
import redirectSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";

export class BillingProfileService {

    static postNewProfile(profile) {
        return new Promise((resolve, reject) => {
            const userToken = localStorage.getItem("token");
            if (!userToken) {
                store.dispatch(redirectSnackBar("error", "No se encuentra autenticado ahora mismo"));
                resolve();
                return;
            }

            return axios.post("/api/billing-profile", { profile }, { params: { userToken } })
                .then(response => {
                    store.dispatch(redirectSnackBar("success", "Perfil guardado satisfactoriamente"));
                    resolve();
                })
                .catch(err => {
                    store.dispatch(redirectSnackBar("error", "No ha sido posible guardar el perfil"));
                    resolve();
                });
        });
    }
}

export default BillingProfileService;
