import axios from "axios";
import store from "../redux/store";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST } from "../redux/actions/types";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";

export class UsersService {

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

    static registerCustomer = (body) => {
        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          };

        store.dispatch({type: REGISTER_REQUEST});
        axios.post('/api/customers', body, config)
        
            .then(response => {
                store.dispatch({type: REGISTER_SUCCESS, payload: response.data})
                store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                localStorage.setItem('account', JSON.stringify(response.data))
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err.message))
              
                store.dispatch({type: REGISTER_ERROR})
            })
    }
    
    logOut = () => {
        localStorage.removeItem('account');
        store.dispatch({type: LOGOUT});
    }

    static getAllRoasters() {
        return axios.get("/api/toasters")
    }

    getRoaster = (roasterId) => {
        return axios.get("/api/toasters", { roasterId })
    }

    getCustomer = (customerId) => {
        return axios.get("/api/customers", { customerId })
    }

}

export default UsersService;
