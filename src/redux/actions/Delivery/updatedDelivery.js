export const type = "PUT_DELIVERY";

const action = (deliveries) => {
  return {
    type,
    payload: deliveries,
  };
};

export default action;