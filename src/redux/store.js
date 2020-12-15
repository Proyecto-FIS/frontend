import { createStore, combineReducers } from "redux";
import sampleReducer from "./reducers/sampleReducer";
import ProductsReducer from "./reducers/ProductsReducer";

export default createStore(
  combineReducers({
    sampleReducer,
    ProductsReducer,
  })
);
