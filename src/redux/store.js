import { createStore, combineReducers, applyMiddleware, compose  } from "redux";
import sampleReducer from "./reducers/sampleReducer";
import ProductsReducer from "./reducers/ProductsReducer";
import thunk from 'redux-thunk';

const middleware = [thunk];

const initialState = {};
const reducers = combineReducers({
  sampleReducer: sampleReducer,
  ProductsReducer: ProductsReducer

})
/*
const store = createStore(
  combineReducers({
    sampleReducer,
    ProductsReducer,
  })
);
*/

// TO DEVELOP WITH REDUX DEVTOOLS USE THIS
const store = createStore(reducers, initialState, compose(
  applyMiddleware(...middleware), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);


export default store;