import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import ProductsReducer from "./reducers/ProductsReducer";
import AlertReducer from "./reducers/AlertReducer";
import AuthReducer from "./reducers/AuthReducer";
import DeliveriesReducer from "./reducers/DeliveriesReducer";
import SnackbarReducer from "./reducers/SnackbarReducer";
import LoaderReducer from "./reducers/LoaderReducer";
import BillingProfileReducer from "./reducers/BillingProfileReducer";

import thunk from 'redux-thunk';

const middleware = [thunk];

const reducers = combineReducers({
    ProductsReducer,
    DeliveriesReducer,
    SnackbarReducer,
    LoaderReducer,
    BillingProfileReducer,
    AlertReducer,
    AuthReducer,
});

const accountFromStorage = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : null;

const initialState = {
    AuthReducer: {account: accountFromStorage}
};


let store;
if (process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION__) {

    // Enable Redux Devtools
    store = createStore(reducers, initialState, compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__())
    );
} else {
    store = createStore(reducers, initialState);
}

export default store;
