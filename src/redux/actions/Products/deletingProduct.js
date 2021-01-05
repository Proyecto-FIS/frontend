export const type = "DELETING_PRODUCT";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
