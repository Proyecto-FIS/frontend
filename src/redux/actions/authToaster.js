import axios from 'axios';
import { LOGIN_SUCCESS, PROFILE_ERROR, PROFILE_REQUEST, PROFILE_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS} from "./types";
import startSnackBar from "./SnackBar/startSnackBar";
import { logout } from "./logout";

// Register Toaster
export const registerToaster = ({ username, email, name, description, phoneNumber, address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({  username, email, name, description, phoneNumber, address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password });

  try {
    dispatch({
      type: REGISTER_REQUEST
    });

    const res = await axios.post('/api/toasters', body, config);

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
        dispatch(startSnackBar("error", err.message));

      dispatch({
        type: REGISTER_ERROR
      });
  }
};


// Get Toaster profile
export const getToasterProfile = (id) => async (dispatch) => {

  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  try {
    dispatch({
      type: PROFILE_REQUEST
    });

    const res = await axios.get(`/api/toasters/${id}`, config);

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

//Update Toaster profile
export const updateToasterProfile = ({ id, email, name, description, phoneNumber, 
    address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password }) => async (dispatch, getState) => {

  const body = JSON.stringify({ email, name, description, phoneNumber, 
    address, instagramUrl, facebookUrl, twitterUrl, pictureUrl, password });

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
    
        const res = await axios.put(`/api/toasters/${id}`, body, config);
    
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