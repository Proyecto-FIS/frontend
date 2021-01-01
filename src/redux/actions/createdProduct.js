export const type = "POST_PRODUCT";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
