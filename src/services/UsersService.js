import axios from "axios";
import store from "../redux/store";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT } from "../redux/actions/types";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";

export class UsersService {

    static getAllRoasters() {
        return axios.get("/api/toasters")
    }

    static login = (body) => {
        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          };

        store.dispatch({type: LOGIN_REQUEST});
        axios.post('/api/auth/login', body, config)
        
            .then(response => {
                store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                localStorage.setItem('account', JSON.stringify(response.data))
        })
            .catch(err =>{ 
                const errors = err.response.data.errors;
                if (errors) {
                    errors.forEach(error => store.dispatch(startSnackBar("error", error.msg)));
                  }
              
                  store.dispatch({type: LOGIN_ERROR});
            })
    }


    getRoaster = (roasterId) => {
        return axios.get("/api/toasters", { roasterId })
    }

    getCustomer = (customerId) => {
        return axios.get("/api/customers", { customerId })
    }

    logOut = () => {
        localStorage.removeItem('account');
        store.dispatch({type: LOGOUT});
    }
}

export default UsersService;
