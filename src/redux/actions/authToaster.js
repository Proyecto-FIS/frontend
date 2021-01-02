import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS} from "./types";
import startSnackBar from "./SnackBar/startSnackBar";


// Register Toaster
export const registerToaster = ({ username, email, name, description, phoneNumber, address, socialNetworks, pictureUrl, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type':'application/json'
    }
  }

  const body = JSON.stringify({  username, email, name, description, phoneNumber, address, socialNetworks, pictureUrl, password });

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
        window.scrollTo(0, 0);

      dispatch({
        type: REGISTER_ERROR
      });
  }
};
