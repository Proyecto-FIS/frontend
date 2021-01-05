import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
import startLoader from "../redux/actions/Loader/startLoader";
import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

// const Stripe = require('stripe');
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


// clave secreta extraida de Stripe. Cambiar a Live para entorno de produccion (no es necesario al tratarse esta app con proposito academico)
// clave extraida de https://dashboard.stripe.com/account/apikeys
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));

export class PaymentService {
    
    static postNewPayment(payment) {
        return new Promise((resolve, reject) => {

            const userToken = localStorage.getItem("token");
            if (!userToken) {
                sendAuthError();
                reject();
                return;
            }

            return axios.post("/api/payment", { payment }, { params: { userToken } })
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
}

export default PaymentService;
