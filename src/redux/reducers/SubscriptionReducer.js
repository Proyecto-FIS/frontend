import { type as SET_SUBSCRIPTION } from "../actions/Payment/setSubscription";

const defaultState = {
    subscription: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case SET_SUBSCRIPTION:
            return { 
                subscription: payload.subscription
            };
        default:
            return state;
    }
};

export default reducer;
