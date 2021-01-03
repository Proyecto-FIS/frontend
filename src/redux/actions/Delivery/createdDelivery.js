export const type = "POST_DELIVERY";

const action = (deliveries) => {
  return {
    type,
    payload: deliveries,
  };
};

export default action;
