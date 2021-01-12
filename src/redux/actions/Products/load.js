export const type = "CLEAR_STATE";

const action = () => {
  return {
    type,
    payload: null,
  };
};

export default action;
