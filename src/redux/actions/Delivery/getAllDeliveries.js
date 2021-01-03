export const type = "GET_ALL_DELIVERIES";

const action = (deliveries) => {
  return {
    type,
    payload: deliveries,
  };
};

export default action;