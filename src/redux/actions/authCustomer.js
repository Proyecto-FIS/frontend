import axios from 'axios';
import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_REQUEST, LOGIN_SUCCESS, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_RESET} from "./types";
import { setAlert } from './alert';
import { logout } from "./logout";


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

// Get Customer profile
export const getCustomerProfile = (id) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  try {
    dispatch({
      type: PROFILE_REQUEST
    });

    const res = await axios.get(`/api/customers/${id}`, config);

    dispatch({
      type: PROFILE_SUCCESS,
      payload: res.data
    });
    
  } catch (err) {
    
      dispatch(setAlert(err.message, 'error'));
      window.scrollTo(0, 0);

      dispatch({
        type: PROFILE_ERROR
      });
  }
};

//Update Customer profile
export const updateCustomerProfile = ({  id, email, address, pictureUrl, password }) => async (dispatch, getState) => {

  const body = JSON.stringify({ email, address, pictureUrl, password });

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }


  try {
    const {AuthReducer: {account}} = getState();

    const token = account.token;
    
    const resp = await axios.get(`/api/auth/${token}`, config);

    const { account_id } = resp.data;

  if (account_id !== account._id) {
    dispatch(logout());

  } else {
      try {
        dispatch({
          type: UPDATE_PROFILE_REQUEST
        });
    
        const res = await axios.put(`/api/customers/${id}`, body, config);
    
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: res.data
        });
        
      } catch (err) {
        
          dispatch(setAlert(err.message, 'error'));
          window.scrollTo(0, 0);
    
          dispatch({
            type: UPDATE_PROFILE_ERROR
          });
      }
    }

  } catch(err) {
    dispatch(setAlert("Token inválido, vuelve a iniciar sesión", 'error'));

    dispatch({
      type: UPDATE_PROFILE_ERROR
    });

    window.scrollTo(0, 0);

    dispatch(logout());
  }



  
};