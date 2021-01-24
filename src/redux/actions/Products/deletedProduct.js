export const type = "DELETED_PRODUCT";

const action = (productId) => {
  return {
    type,
    payload: productId,
  };
};

export default action;
