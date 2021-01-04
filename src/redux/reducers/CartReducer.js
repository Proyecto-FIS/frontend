import { type as UPDATE_CART } from "../actions/Cart/updateCart";

const defaultState = {
    productList: []
}

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case UPDATE_CART:
            return {
                productList: payload
            };
        default:
            return state;
    }
};

export default reducer;