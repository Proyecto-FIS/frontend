import { type as getAllProducts } from "../actions/getAllProducts";

const defaultState = [];

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case getAllProducts:
      return payload;
    default:
      return state;
  }
};

// Remember to add it to store.js
export default reducer;
