import { type as SET_BILLING_PROFILE } from "../actions/BillingProfile/setBillingProfile";

const defaultState = {
    billingProfile: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case SET_BILLING_PROFILE:
            return { 
                billingProfile: payload.profile
            };
        default:
            return state;
    }
};

export default reducer;
