export const type = "GET_DELIVERY";

const action = (deliveries) => {
  return {
    type,
    payload: deliveries,
  };
};

export default action;
