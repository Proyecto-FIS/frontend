export const type = "CLEAR_ERRORS";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
