import { type as PURCHASE_HISTORY_LOAD } from "../actions/PurchaseHistory/load";
import { type as PURCHASE_HISTORY_DONE } from "../actions/PurchaseHistory/done";

const defaultState = {
    elements: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case PURCHASE_HISTORY_LOAD:
            return { 
                elements: null
            };
        case PURCHASE_HISTORY_DONE:
            return {
                elements: payload.elements
            };
        default:
            return state;
    }
};

export default reducer;
