export const type = "LOADING_ERROR";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
