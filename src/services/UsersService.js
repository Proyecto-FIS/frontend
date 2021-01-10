import axios from "axios";
import store from "../redux/store";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, GET_TOASTERS_SUCCESS, REQUEST_TOASTERS } from "../redux/actions/types";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";

export class UsersService {

    static getUserToken = () => {
        const account = store.getState().AuthReducer.account;
        if(account) {
            return account.token;
        } else {
            store.dispatch(startSnackBar("error", "No se encuentra autenticado ahora mismo"));
            return null;
        }
    };

    // --------- AUTH -----------
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

    static logOut = () => {
        localStorage.removeItem('account');
        store.dispatch({type: LOGOUT});
    }


    // --------- CUSTOMER -----------
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
                store.dispatch(startSnackBar("error", err.response.data.message))
                store.dispatch({type: REGISTER_ERROR})
            })
    }

    static getCustomerProfile = (accountId) => {

        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          }
          
        store.dispatch({type: PROFILE_REQUEST});
        axios.get(`/api/customers/${accountId}`, config)
        
            .then(response => {
                store.dispatch({type: PROFILE_SUCCESS, payload: response.data})
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err.message))
              
                store.dispatch({type: PROFILE_ERROR})
            })

    }

    static updateCustomerProfile = (accountId, body) => {
        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          };

          const {AuthReducer: {account}} = store.getState();

          const token = account.token;

          axios.get(`/api/auth/${token}`, config)
            .then(response => {
                const { account_id: loggedAccountId } = response.data;

                if (accountId !== loggedAccountId) {
                    store.dispatch(startSnackBar("error", "Operación no autorizada"))
                    store.dispatch({type: LOGOUT})

                } else {
                    store.dispatch({type: UPDATE_PROFILE_REQUEST})

                    axios.put(`/api/customers/${accountId}`, body, config)
                    .then(response => {
                        store.dispatch({type: UPDATE_PROFILE_SUCCESS, payload: response.data})
                        store.dispatch(startSnackBar("success", "Perfil actualizado correctamente"))
                    })
                    .catch(err => { 
                        store.dispatch(startSnackBar("error", err.response.data.message))
                        store.dispatch({type: UPDATE_PROFILE_ERROR})
                    })
                    
                }
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", "Token inválido, vuelve a iniciar sesión"))
                store.dispatch({type: UPDATE_PROFILE_ERROR})
                store.dispatch({type: LOGOUT})
                
            })
          
    }


    // --------- TOASTER -----------
    static registerToaster = (body) => {
        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          };

        store.dispatch({type: REGISTER_REQUEST});
        axios.post('/api/toasters', body, config)
        
            .then(response => {
                store.dispatch({type: REGISTER_SUCCESS, payload: response.data})
                store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                localStorage.setItem('account', JSON.stringify(response.data))
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err.response.data.message))
              
                store.dispatch({type: REGISTER_ERROR})
            })
    }

    static getToasterProfile = (accountId) => {

        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          }
          
        store.dispatch({type: PROFILE_REQUEST});
        axios.get(`/api/toasters/${accountId}`, config)
        
            .then(response => {
                store.dispatch({type: PROFILE_SUCCESS, payload: response.data})
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err.response.data.message))
              
                store.dispatch({type: PROFILE_ERROR})
            })

    }

    static updateToasterProfile = (accountId, body) => {
        const config = {
            headers: {
              'Content-Type':'application/json'
            }
          };

          const {AuthReducer: {account}} = store.getState();

          const token = account.token;

          axios.get(`/api/auth/${token}`, config)
            .then(response => {
                const { account_id: loggedAccountId } = response.data;

                if (accountId !== loggedAccountId) {
                    store.dispatch(startSnackBar("error", "Operación no autorizada"))
                    store.dispatch({type: LOGOUT})

                } else {
                    store.dispatch({type: UPDATE_PROFILE_REQUEST})

                    axios.put(`/api/toasters/${accountId}`, body, config)
                    .then(response => {
                        store.dispatch({type: UPDATE_PROFILE_SUCCESS, payload: response.data})
                        store.dispatch(startSnackBar("success", "Perfil actualizado correctamente"))
                    })
                    .catch(err => { 
                        store.dispatch(startSnackBar("error", err.response.data.message))
                        store.dispatch({type: UPDATE_PROFILE_ERROR})
                    })
                    
                }
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", "Token inválido, vuelve a iniciar sesión"))
                store.dispatch({type: UPDATE_PROFILE_ERROR})
                store.dispatch({type: LOGOUT})
                
            })
          
    }

    static getAllToasters = () => {
        store.dispatch({type: REQUEST_TOASTERS});
        axios.get("/api/toasters")
            .then(response => store.dispatch({type: GET_TOASTERS_SUCCESS, payload:response.data}))
            .catch(err => 
                store.dispatch(startSnackBar("error", err.response.data.message)))
    }

}

export default UsersService;
