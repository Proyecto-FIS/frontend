import axios from "axios";
import store from "../redux/store";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST } from "../redux/actions/types";
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

    // static login = (username, password) => {
    //     store.dispatch(loadingProducts());
    //     axios.post('/api/auth/login', body, config)
    //         .then(response => store.dispatch(getAllProducts(response.data)))
    //         .catch(err => loadingError())
    // }


    getRoaster = (roasterId) => {
        return axios.get("/api/toasters", { roasterId })
    }

    getCustomer = (customerId) => {
        return axios.get("/api/customers", { customerId })
    }
}

export default UsersService;
