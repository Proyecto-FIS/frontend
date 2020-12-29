import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { createStore, combineReducers } from "redux";

const createReduxStore = (reducers) => createStore(combineReducers(reducers));
const renderRedux = (component, store) => render(<Provider store={store}>{component}</Provider>);

export { createReduxStore, renderRedux };
