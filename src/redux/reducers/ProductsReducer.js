import { type as GET_ALL_PRODUCTS } from "../actions/getAllProducts";
import { type as LOADING_PRODUCTS } from "../actions/loadingProducts";
import { type as LOADING_PRODUCT } from "../actions/loadingProduct";
import { type as LOADING_ERROR } from "../actions/loadingError";
import { type as GET_A_PRODUCT } from "../actions/getProduct";
import { type as WAITING_RESPONSE } from "../actions/creatingProduct";
import { type as IMAGE_UPLOADED } from "../actions/imageUploaded";
import { type as CLEAR_ERRORS } from "../actions/clearProductErrors";
import { type as SET_ERRORS } from "../actions/setProductErrors";
import { type as POST_PRODUCT } from "../actions/createdProduct";
import { type as DELETING_PRODUCT } from "../actions/Products/deletingProduct";
import { type as DELETED_PRODUCT } from "../actions/Products/deletedProduct";

const defaultState = {
    productList: [],
    productDetails: {
        product: {},
        deleted: false,
        loading: true,
    },
    newProduct:{
        loading: false,
        productImage: null,
        created: false,
        errors: {},
    },
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
        case LOADING_PRODUCT:
            return {
                ...state,
                productList:[],
                productDetails: {
                    product: {},
                    loading: true
                },
            };
        case GET_A_PRODUCT:
            return {
                ...state,
                productDetails: {
                    product: payload,
                    loading: false
                }
            };
        case WAITING_RESPONSE:
            return {
                ...state,
                newProduct: {
                    loading: true,
                }
            }
        case IMAGE_UPLOADED:
            return {
                ...state,
                newProduct: {
                    loading: false,
                    productImage: payload,
                }
            }
        case POST_PRODUCT:
            return {
                ...state,
                newProduct:{
                    loading: false,
                    created: true,
                }
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                newProduct:{
                    errors: null,
                }
            }
        case SET_ERRORS:
            return {
                ...state,
                newProduct: {
                    loading: false,
                    errors: payload
                }
            }
        case DELETED_PRODUCT:
            return {
                ...state,
                productDetails: {
                    ...state.productDetails,
                    loading: false,
                    deleted: true,
                }
            }
        case DELETING_PRODUCT:
            return {
                ...state,
                productDetails: {
                    ...state.productDetails,
                    loading: true,
                }
            }
        default:
            return state;
    }
};

export default reducer;
