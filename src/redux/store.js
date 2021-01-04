import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import ProductsReducer from "./reducers/ProductsReducer";
import AlertReducer from "./reducers/AlertReducer";
import AuthReducer from "./reducers/AuthReducer";
import DeliveriesReducer from "./reducers/DeliveriesReducer";
import ProfileReducer from "./reducers/ProfileReducer";
import UpdateProfileReducer from "./reducers/UpdateProfileReducer";

import thunk from 'redux-thunk';

const middleware = [thunk];

const reducers = combineReducers({
    ProductsReducer,
    AlertReducer,
    AuthReducer,
    DeliveriesReducer,
    ProfileReducer,
    UpdateProfileReducer
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
