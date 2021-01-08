import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
// import startLoader from "../redux/actions/Loader/startLoader";
// import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

// clave secreta extraida de Stripe. Cambiar a Live para entorno de produccion (no es necesario al tratarse esta app con proposito academico)
// clave extraida de https://dashboard.stripe.com/account/apikeys
// const Stripe = require('stripe');
// const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));
export class PaymentService {

    static async postPayment(email, price, billing_profile_id) {
        const userToken = localStorage.getItem("token");
        // if (!userToken) {
        //     sendAuthError();
        //     reject();
        //     return;
        // }
        return axios.post("http://localhost:3001/api/v1/payment", {
            email: email,
            price: price,
            billing_profile_id: billing_profile_id
        }
        // , {
        //     params: {
        //         userToken
        //     }
        // }
        );
    }

    static async postSubscription(pay_id, email) {
        return axios.post("http://localhost:3001/api/v1/subscription", {
            'payment_method': pay_id,
            'email': email
        });
    }
}

export default PaymentService;