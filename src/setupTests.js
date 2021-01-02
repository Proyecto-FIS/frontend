import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createStore, combineReducers } from "redux";

const createReduxStore = (reducers) => createStore(combineReducers(reducers));
const getReduxComponent = (component, store) => <Provider store={store}>{component}</Provider>;
const renderRedux = (component, store) => render(getReduxComponent(component, store));

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

export { createReduxStore, renderRedux, getReduxComponent };
