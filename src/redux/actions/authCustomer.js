import axios from 'axios';
import { REGISTER_ERROR, REGISTER_SUCCESS} from "./types";
import { setAlert } from './alert';

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
