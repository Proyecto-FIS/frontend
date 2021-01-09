import axios from "axios";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";
// import startLoader from "../redux/actions/Loader/startLoader";
// import finishLoader from "../redux/actions/Loader/finishLoader";
import store from "../redux/store";

const sendAuthError = () => store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));
export class PaymentService {

    static async postPayment(email, price, billing_profile_id) {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            throw("ERROR no authenticated");
            return;
        }

        return axios.post("http://localhost:3001/api/v1/payment", {
            payment: {
                email,
                price,
                billing_profile_id
            }    
        }, {
            params: {
                userToken
            }
        }
        );
    }

    static async postSubscription(payment_method, email, billing_profile_id) {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
            sendAuthError();
            throw("ERROR no authenticated");
            return;
        }

        return axios.post("http://localhost:3001/api/v1/subscription", {
            "payment": {
                email,
                payment_method,
                billing_profile_id
            } 
        }, {
            params: {
                userToken
            }
        });
    }
}

export default PaymentService;