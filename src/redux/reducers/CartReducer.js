import { type as UPDATE_CART } from "../actions/Cart/updateCart";

const defaultState = {
    productList: [],
    quantity: 0,
    totalPrice: 0,
}

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case UPDATE_CART:
            return {
                productList: payload,
                quantity: payload.reduce((totalProducts, product) => totalProducts + product.quantity,0),
                totalPrice: payload.reduce((totalPrice, product) => totalPrice + product.quantity * product.unitPriceEuros, 0)
            };
        default:
            return state;
    }
};

export default reducer;