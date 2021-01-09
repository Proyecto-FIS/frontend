export const type = "BILLINGPROFILE_DONE";

const action = (elements = []) => {
    return {
        type,
        payload: {
            elements
        },
    };
};

export default action;
