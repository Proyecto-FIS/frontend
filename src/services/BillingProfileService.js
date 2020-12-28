import axios from "axios";
import redirectSnackBar from "../redux/actions/SnackBar/startSnackBar";
import store from "../redux/store";

export class BillingProfileService {

    static postNewProfile(profile) {
        
        const userToken = localStorage.getItem("token");
        if(!userToken) {
            store.dispatch(redirectSnackBar("error", "No se encuentra autenticado ahora mismo"));
            return;
        }

        axios.post("/api/billing-profile", { profile }, {
            params: { userToken }
        })
        .then(response => store.dispatch(redirectSnackBar("success", "Perfil guardado satisfactoriamente")))
        .catch(err => store.dispatch(redirectSnackBar("error", "No ha sido posible guardar el perfil")));
    }
}

export default BillingProfileService;
