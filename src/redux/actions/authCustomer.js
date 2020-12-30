import axios from 'axios';
import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_SUCCESS} from "./types";
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
    dispatch({
      type: REGISTER_REQUEST
    });

    const res = await axios.post('/api/customers', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    localStorage.setItem('account', JSON.stringify(res.data));
    
  } catch (err) {
    
      dispatch(setAlert(err.message, 'error'));
      window.scrollTo(0, 0);

      dispatch({
        type: REGISTER_ERROR
      });
  }
};
