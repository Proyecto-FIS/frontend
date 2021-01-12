export const type = "GET_ALL_PRODUCTS";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
