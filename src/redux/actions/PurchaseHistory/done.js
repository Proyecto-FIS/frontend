export const type = "PURCHASE_HISTORY_DONE";

const action = (elements = []) => {
    return {
        type,
        payload: {
            elements
        },
    };
};

export default action;
