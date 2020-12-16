import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import ProductsReducer from "./reducers/ProductsReducer";
import thunk from 'redux-thunk';

const middleware = [thunk];
const initialState = {};

const reducers = combineReducers({
    ProductsReducer
});

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
