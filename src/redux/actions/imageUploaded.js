export const type = "IMAGE_UPLOADED";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
