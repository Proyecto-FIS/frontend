import { PROFILE_REQUEST, PROFILE_ERROR, PROFILE_SUCCESS} from "../actions/types";


const defaultState = {
    user: {}
};

const reducer = (state = defaultState, { type, payload }) => {
   switch (type) {
       case PROFILE_REQUEST:
           return {
               ...state,
               loading: true
           };
       case PROFILE_SUCCESS:
           return {
               loading: false,
               user: payload
           };
       case PROFILE_ERROR:
           return {
               loading: false,
               error: payload
           }
       default:
           return state;
   }
};

export default reducer;