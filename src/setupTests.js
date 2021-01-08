import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createStore, combineReducers } from "redux";
import { LOGIN_SUCCESS, LOGOUT } from "./redux/actions/types";

const createReduxStore = (reducers) => createStore(combineReducers(reducers));
const getReduxComponent = (component, store) => <Provider store={store}>{component}</Provider>;
const renderRedux = (component, store) => render(getReduxComponent(component, store));
const doLogin = (store) => store.dispatch({ type: LOGIN_SUCCESS, payload: { token: "sample_token" } });
const doLogout = (store) => store.dispatch({ type: LOGOUT, payload: null });

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

export { createReduxStore, renderRedux, getReduxComponent, doLogin, doLogout };
