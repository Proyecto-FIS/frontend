export const type = "WAITING_RESPONSE";

const action = (products) => {
  return {
    type,
    payload: products,
  };
};

export default action;
