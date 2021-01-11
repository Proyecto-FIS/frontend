import { PROFILE_REQUEST, PROFILE_ERROR, PROFILE_SUCCESS, TOASTER_PRODUCTS_REQUEST, TOASTER_PRODUCTS_SUCCESS, TOASTER_PRODUCTS_ERROR} from "../actions/types";


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
        case TOASTER_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                toasterProducts: []
            };
        case TOASTER_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                toasterProducts: payload
            };
        case TOASTER_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
       default:
           return state;
   }
};

export default reducer;