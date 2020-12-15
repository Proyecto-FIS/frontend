import { type as GET_ALL_PRODUCTS } from "../actions/getAllProducts";
import { type as LOADING_PRODUCTS } from "../actions/loadingProducts";
import { type as LOADING_ERROR } from "../actions/loadingError";
import { type as GET_A_PRODUCT } from "../actions/getAProduct";


const defaultState = {
  products: [],
  loading: false
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case LOADING_PRODUCTS:
      return {
        ...state,
        loading: true
      };
    case LOADING_ERROR:
      return {
        ...state,
        loading: false,
        products: []
      }
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: payload
      };
    case GET_A_PRODUCT:
      return {
        ...state,
        loading: false,
        products: payload
      };
    default:
      return state;
  }
};

// Remember to add it to store.js
export default reducer;
