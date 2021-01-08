import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import ProductsReducer from "./reducers/ProductsReducer";
import AuthReducer from "./reducers/AuthReducer";
import DeliveriesReducer from "./reducers/DeliveriesReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import UpdateProfileReducer from "./reducers/UpdateProfileReducer";
import SnackbarReducer from "./reducers/SnackbarReducer";
import PurchaseHistoryReducer from "./reducers/PurchaseHistoryReducer";
import BillingProfileReducer from "./reducers/BillingProfileReducer";
import CartReducer from "./reducers/CartReducer";


import thunk from 'redux-thunk';

const middleware = [thunk];

const reducers = combineReducers({
    ProductsReducer,
    ProfileReducer,
    UpdateProfileReducer,
    DeliveriesReducer,
    SnackbarReducer,
    BillingProfileReducer,
    PurchaseHistoryReducer,
    AuthReducer,
    CartReducer
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
