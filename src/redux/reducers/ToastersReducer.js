import { REQUEST_TOASTERS, GET_TOASTERS_SUCCESS, GET_TOASTERS_ERROR} from "../actions/types";


const defaultState = {
    toasters: []
};

const reducer = (state = defaultState, { type, payload }) => {
   switch (type) {
       case REQUEST_TOASTERS:
           return {
               loading: true
           };
       case GET_TOASTERS_SUCCESS:
           return {
               loading: false,
               toasters: payload
           };
       case GET_TOASTERS_ERROR:
           return {
               loading: false,
               error: payload
           }
       default:
           return state;
   }
};

export default reducer;