export const type = "getAllProducts";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
