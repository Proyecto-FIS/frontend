import { LOGOUT } from "./types";

const logout = () => async dispatch => {
  localStorage.removeItem('account');
  dispatch({
    type: LOGOUT
  });
};

export default logout;