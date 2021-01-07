export const type = "DELETED_PRODUCT";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
