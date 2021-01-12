export const type = "SET_ERRORS";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
