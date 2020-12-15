export const type = "GET_A_PRODUCT";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
