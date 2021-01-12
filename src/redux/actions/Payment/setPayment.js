export const type = "SET_PAYMENT";

const action = (payment) => {
    return {
        type,
        payload: { payment },
    };
};

export default action;
