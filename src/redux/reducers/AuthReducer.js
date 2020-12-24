import { REGISTER_SUCCESS, REGISTER_ERROR, USER_LOADED, AUTH_ERROR, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT } from "../actions/types";


const defaultState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    account: null
};

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                account: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
                localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_ERROR:
        case AUTH_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: false,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;