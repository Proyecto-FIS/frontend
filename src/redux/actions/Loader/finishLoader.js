export const type = "FINISH_LOADER";

const action = (elements = []) => {
    return {
        type,
        payload: {
            elements
        },
    };
};

export default action;
