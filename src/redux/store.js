import { createStore, combineReducers } from "redux";
import sampleReducer from "./reducers/sampleReducer";

export default createStore(combineReducers({
    sampleReducer
}));
