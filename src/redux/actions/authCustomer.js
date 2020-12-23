import axios from 'axios';
import { REGISTER_ERROR, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED} from "./types";
import { setAlert } from './alert';
import authToken from '../../utils/authToken';

// Load account
export const loadAccount = () => async dispatch => {

  if(localStorage.token) {
    authToken(localStorage.token);
    }

  try {
    const res = await axios.get('/api/auth/');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};


// Register Customer
export const registerCustomer = ({  username, email, address, pictureUrl, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({  username, email, address, pictureUrl, password });

  try {
    const res = await axios.post('/api/customers', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadAccount());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_ERROR
    });
  }
};
