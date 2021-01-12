export const type = "SET_SUBSCRIPTION";

const action = (subscription) => {
    return {
        type,
        payload: { subscription },
    };
};

export default action;
