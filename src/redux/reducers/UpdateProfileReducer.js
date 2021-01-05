import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR} from "../actions/types";


const defaultState = {
};

const reducer = (state = defaultState, { type, payload }) => {
   switch (type) {
       case UPDATE_PROFILE_REQUEST:
           return {
               loading: true
           };
       case UPDATE_PROFILE_SUCCESS:
           return {
               loading: false,
               success: true,
               account: payload
           };
       case UPDATE_PROFILE_ERROR:
           return {
               loading: false,
               error: payload
           }
       default:
           return state;
   }
};

export default reducer;