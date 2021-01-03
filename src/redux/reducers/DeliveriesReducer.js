import { type as GET_ALL_DELIVERIES } from "../actions/getAllDeliveries";
import { type as GET_DELIVERY } from "../actions/getDelivery";
import { type as POST_DELIVERY } from "../actions/Delivery/createdDelivery";
import { type as PUT_DELIVERY } from "../actions/Delivery/updatedDelivery";
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
        case POST_DELIVERY:
            return {
                ...state,
                newDelivery: {
                    created: true,
                }
            };
        case PUT_DELIVERY:
            return {
                ...state,
                newDelivery: {
                    updated: true,
                }
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
