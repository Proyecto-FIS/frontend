import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST } from "./types";
import { setAlert } from './alert';

export const login = ( username, password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type':'application/json'
      }
    };
  
    const body = JSON.stringify({ username, password });
  
    try {
      dispatch({
        type: LOGIN_REQUEST
      });

      const res = await axios.post('/api/auth/login', body, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      localStorage.setItem('account', JSON.stringify(res.data));

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