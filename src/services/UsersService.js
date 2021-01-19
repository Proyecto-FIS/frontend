import axios from "axios";
import store from "../redux/store";
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, GET_TOASTERS_SUCCESS, REQUEST_TOASTERS, TOASTER_PRODUCTS_ERROR, TOASTER_PRODUCTS_SUCCESS, TOASTER_PRODUCTS_REQUEST } from "../redux/actions/types";
import startSnackBar from "../redux/actions/SnackBar/startSnackBar";

const config = {
    headers: {
      'Content-Type':'application/json'
    }
  };


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
        return new Promise((resolve, reject) => {
            store.dispatch({type: LOGIN_REQUEST});
            
            axios.post('/api/auth/login', body, config)
            
                .then(response => {
                    store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                    localStorage.setItem('account', JSON.stringify(response.data))
                    resolve()
            })
                .catch(err =>{ 
                    store.dispatch({type: LOGIN_ERROR});
                    store.dispatch(startSnackBar("error", "Credenciales incorrectas"));
                    
                    reject()
                })
        })
    }

    static logOut = () => {
        localStorage.removeItem('account');
        store.dispatch({type: LOGOUT});
    }


    // --------- CUSTOMER -----------
    static registerCustomer = (body) => {
        return new Promise((resolve, reject) => {

            store.dispatch({type: REGISTER_REQUEST});

            axios.post('/api/customers', body, config)
                    .then(response => {
                        store.dispatch({type: REGISTER_SUCCESS, payload: response.data})
                        store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                        localStorage.setItem('account', JSON.stringify(response.data))

                        resolve()
                    })
                    .catch(err => {
                        console.log(err.response)
                        store.dispatch(startSnackBar("error", "Error al registrar un cliente. Puede que el nick o email ya estén en uso."))
                        store.dispatch({type: REGISTER_ERROR})

                        reject()
                    })
        })
    };

    static getCustomerProfile = (accountId) => { 
        store.dispatch({type: PROFILE_REQUEST});
        axios.get(`/api/customers/${accountId}`, config)
        
            .then(response => {
                store.dispatch({type: PROFILE_SUCCESS, payload: response.data})

            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err.message))
            
                store.dispatch({type: PROFILE_ERROR})
            })
    };

    static updateCustomerProfile = (accountId, body) => {
        return new Promise((resolve, reject) => {
            
            const userToken = UsersService.getUserToken();
            if (!userToken) {
              reject();
              return;
            }

            // console.log(body)
            // //Adding userToken to body
            // var objBody = JSON.parse(body);
            // objBody.userToken = userToken;
            // var newBody = JSON.stringify(objBody);


            return axios.get(`/api/auth/${userToken}`, config)
            .then(response => {
                const { account_id: loggedAccountId } = response.data;

                if (accountId !== loggedAccountId) {
                    store.dispatch(startSnackBar("error", "Operación no autorizada"))
                    reject();
                } else {
                    store.dispatch({type: UPDATE_PROFILE_REQUEST})

                    axios.put(`/api/customers/${accountId}`, 
                            { userToken: userToken, body: body }, config)
                    .then(response => {
                        store.dispatch({type: UPDATE_PROFILE_SUCCESS, payload: response.data})
                        store.dispatch(startSnackBar("success", "Perfil actualizado correctamente"))

                        resolve();
                    })
                    .catch(err => { 
                        store.dispatch(startSnackBar("error", err.response.data.message))
                        store.dispatch({type: UPDATE_PROFILE_ERROR})

                        reject();
                    })  
                }
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", "Token inválido, vuelve a iniciar sesión"))
                store.dispatch({type: UPDATE_PROFILE_ERROR})
                store.dispatch({type: LOGOUT})

                reject()
            })

        });     
    }


    // --------- TOASTER -----------
    static registerToaster = (body) => {
        return new Promise((resolve, reject) => {
            store.dispatch({type: REGISTER_REQUEST});
            console.log(body);
            axios.post('/api/toasters', body, config)
                .then(response => {
                    store.dispatch({type: REGISTER_SUCCESS, payload: response.data})
                    store.dispatch({type: LOGIN_SUCCESS, payload: response.data})
                    localStorage.setItem('account', JSON.stringify(response.data))
                    resolve()
                })
                .catch(err => { 
                    store.dispatch(startSnackBar("error", "Error al registrar un tostador. Puede que el nick, nombre o email ya estén en uso."))
                    console.log(err)
                    console.log(err.response)
                    console.log(err.response.data)
                    console.log(err.response.data.message)
                    store.dispatch({type: REGISTER_ERROR})
                    reject()
                })
        });
    }

    static getToasterProfile = (accountId) => {
        store.dispatch({type: PROFILE_REQUEST});

        axios.get(`/api/toasters/${accountId}`, config)
            .then(response => {
                store.dispatch({type: PROFILE_SUCCESS, payload: response.data})
                store.dispatch({type: TOASTER_PRODUCTS_REQUEST});

                axios.get(`/api/products?providerId=${accountId}`, config)
                    .then(response => {
                        store.dispatch({type: TOASTER_PRODUCTS_SUCCESS, payload: response.data})
                    })
                    .catch(err => {
                        store.dispatch(startSnackBar("error", err))
            
                        store.dispatch({type: TOASTER_PRODUCTS_ERROR})
                    })
            })
            .catch(err => { 
                store.dispatch(startSnackBar("error", err))
            
                store.dispatch({type: PROFILE_ERROR})
            })
    }

    static updateToasterProfile = (accountId, body) => {
        return new Promise((resolve, reject) => {
            const userToken = UsersService.getUserToken();
            if (!userToken) {
            reject();
            return;
            }

            //Adding userToken to body
            var objBody = JSON.parse(body);
            objBody.userToken = userToken;
            var newBody = JSON.stringify(objBody);

            axios.get(`/api/auth/${userToken}`, config)
                .then(response => {
                    const { account_id: loggedAccountId } = response.data;

                    if (accountId !== loggedAccountId) {
                        store.dispatch(startSnackBar("error", "Operación no autorizada"))
                        reject()
                    } else {
                        store.dispatch({type: UPDATE_PROFILE_REQUEST})

                        axios.put(`/api/toasters/${accountId}`, newBody, config)
                        .then(response => {
                            store.dispatch({type: UPDATE_PROFILE_SUCCESS, payload: response.data})
                            store.dispatch(startSnackBar("success", "Perfil actualizado correctamente"))

                            resolve()
                        })
                        .catch(err => { 
                            store.dispatch(startSnackBar("error", err.response.data.message))
                            store.dispatch({type: UPDATE_PROFILE_ERROR})

                            reject()
                        })
                        
                    }
                })
                .catch(err => { 
                    store.dispatch(startSnackBar("error", "Token inválido, vuelve a iniciar sesión"))
                    store.dispatch({type: UPDATE_PROFILE_ERROR})
                    store.dispatch({type: LOGOUT})

                    reject()
                    
                })
        });
          
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
