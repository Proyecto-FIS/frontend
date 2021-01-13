export const type = "SUBSCRIPTION_DONE";

const action = (elements = []) => {
    return {
        type,
        payload: {
            elements
        },
    };
};

export default action;
