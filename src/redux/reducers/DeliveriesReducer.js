import { type as GET_ALL_DELIVERIES } from "../actions/getAllDeliveries";
import { type as GET_DELIVERY } from "../actions/getDelivery";


const defaultState = {
    deliveryList: [],
    deliveryDetails: {},
    };

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DELIVERIES:
            return {
                ...state,
                deliveryList: payload
            };
        case GET_DELIVERY:
            return {
                ...state,
                deliveryDetails: payload
            };
        default:
            return state;
    }
};

export default reducer;
