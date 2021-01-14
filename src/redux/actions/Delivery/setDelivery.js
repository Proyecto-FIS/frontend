export const type = "SET_DELIVERY";

const action = (delivery) => {
    return {
        type,
        payload: { delivery },
    };
};

export default action;