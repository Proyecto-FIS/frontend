import { type as SET_PAYMENT } from "../actions/Payment/setPayment";

const defaultState = {
    payment: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case SET_PAYMENT:
            return { 
                payment: payload.payment
            };
        default:
            return state;
    }
};

export default reducer;
