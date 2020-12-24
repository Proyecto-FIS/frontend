import { LOGOUT } from "./types";

export const logout = () => async dispatch => {

      dispatch({
        type: LOGOUT
      });
    
  };