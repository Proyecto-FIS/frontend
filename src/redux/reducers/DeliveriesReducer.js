import { type as GET_ALL_DELIVERIES } from "../actions/Delivery/getAllDeliveries";
import { type as GET_DELIVERY } from "../actions/Delivery/getDelivery";
import { type as SET_DELIVERY } from "../actions/Delivery/setDelivery";
import { type as DELIVERY_LOAD } from "../actions/Delivery/load";
import { type as DELIVERY_DONE } from "../actions/Delivery/done";


const defaultState = {
    deliveryList: [],
    deliveryDetails: {},
    delivery: null,
    elements: null
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
                ...state,
                delivery: payload.delivery
            };
        case DELIVERY_LOAD:
            return {
                ...state,
                elements: null
            };
        case DELIVERY_DONE:
            return {
                ...state,
                elements: payload.elements
            };
        default:
            return state;
    }
};

export default reducer;
