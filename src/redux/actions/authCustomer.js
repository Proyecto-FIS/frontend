import axios from 'axios';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR} from "./types";
import startSnackBar from "./SnackBar/startSnackBar";
import logout from "./logout";



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
    
      dispatch(startSnackBar("error", err.message));

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

        dispatch(startSnackBar("success", "Perfil actualizado correctamente"));
        
      } catch (err) {
        
          dispatch(startSnackBar("error", err.message));
    
          dispatch({
            type: UPDATE_PROFILE_ERROR
          });
      }
    }

  } catch(err) {
    dispatch(startSnackBar("Token inválido, vuelve a iniciar sesión", err.message));

    dispatch({
      type: UPDATE_PROFILE_ERROR
    });

    dispatch(logout());
  }

  
};