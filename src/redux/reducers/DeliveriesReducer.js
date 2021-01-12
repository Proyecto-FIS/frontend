import { type as GET_ALL_DELIVERIES } from "../actions/Delivery/getAllDeliveries";
import { type as GET_DELIVERY } from "../actions/Delivery/getDelivery";
import { type as SET_DELIVERY } from "../actions/Delivery/setDelivery";


const defaultState = {
    deliveryList: [],
    deliveryDetails: {},
    delivery: null
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
        case SET_DELIVERY:
            return {
                delivery: payload.delivery
            };
        default:
            return state;
    }
};

export default reducer;
