import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR } from "./types";
import { setAlert } from './alert';
import { loadAccount } from './authCustomer';

export const login = ( username, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    };
  
    const body = JSON.stringify({ username, password });
  
    try {
      const res = await axios.post('/api/auth/login', body, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadAccount());
  
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
  
      dispatch({
        type: LOGIN_ERROR
      });
    }
  };