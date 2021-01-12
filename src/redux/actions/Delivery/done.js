export const type = "DELIVERY_DONE";

const action = (elements = []) => {
    return {
        type,
        payload: {
            elements
        },
    };
};

export default action;