import { type as GET_ALL_DELIVERIES } from "../actions/getAllDeliveries";
import { type as GET_DELIVERY } from "../actions/getDelivery";


const defaultState = {
    deliveryList: [],
    deliveryDetails: {},
    loading: true
};

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case GET_ALL_DELIVERIES:
            return {
                ...state,
                loading: false,
                deliveryList: payload
            };
        case GET_DELIVERY:
            return {
                ...state,
                loading: false,
                deliveryDetails: payload
            };
        default:
            return state;
    }
};

export default reducer;
