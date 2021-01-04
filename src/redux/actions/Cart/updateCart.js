export const type = "UPDATE_CART";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
