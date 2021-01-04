export const type = "START_SNACKBAR";

const action = (severity, message) => {
    return {
        type,
        payload: { severity, message },
    };
};

export default action;