import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_REQUEST,
     LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../actions/types";


const defaultState = {};

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
            return {
                loading: true
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                loading: false,
                account: payload,
                error: null
            };
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                loading: false,
                error: payload
            }
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default reducer;