export const type = "SET_BILLING_PROFILE";

const action = (profile) => {
    return {
        type,
        payload: { profile },
    };
};

export default action;
