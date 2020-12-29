import { LOGOUT } from "./types";

export const logout = () => async dispatch => {

  localStorage.removeItem('account');

  dispatch({
    type: LOGOUT
  });
    
  };