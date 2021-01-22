import { type as SUBSCRIPTION_LOAD } from "../actions/Subscription/load";
import { type as SUBSCRIPTION_DONE } from "../actions/Subscription/done";

const defaultState = {
    elements: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case SUBSCRIPTION_LOAD:
            return { 
                elements: null
            };
        case SUBSCRIPTION_DONE:
            return {
                elements: payload.elements
            };
        default:
            return state;
    }
};

export default reducer;
