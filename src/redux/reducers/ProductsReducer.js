import { type as GET_ALL_PRODUCTS } from "../actions/getAllProducts";
import { type as LOADING_PRODUCTS } from "../actions/loadingProducts";
import { type as LOADING_ERROR } from "../actions/loadingError";
import { type as GET_A_PRODUCT } from "../actions/getProduct";


const defaultState = {
    productList: [],
    productDetails: {},
    loading: true
};

const reducer = (state = defaultState, { type, payload }) => {
    switch (type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                productList:[],
                productDetails: {},
                loading: true
            };
        case LOADING_ERROR:
            return {
                ...state,
                loading: false,
                productList:[],
                productDetails: {},
            }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                loading: false,
                productList: payload
            };
        case GET_A_PRODUCT:
            return {
                ...state,
                loading: false,
                productDetails: payload
            };
        default:
            return state;
    }
};

export default reducer;
