export const type = "LOADING_PRODUCTS";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
