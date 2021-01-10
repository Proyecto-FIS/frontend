import { type as SET_BILLING_PROFILE } from "../actions/BillingProfile/setBillingProfile";
import { type as BILLINGPROFILE_LOAD } from "../actions/BillingProfile/load";
import { type as BILLINGPROFILE_DONE } from "../actions/BillingProfile/done";

const defaultState = {
    billingProfile: null,
    elements: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case SET_BILLING_PROFILE:
            return {
                ...state,
                billingProfile: payload.profile
            };
        case BILLINGPROFILE_LOAD:
            return {
                ...state,
                elements: null
            };
        case BILLINGPROFILE_DONE:
            return {
                ...state,
                elements: payload.elements
            };
        default:
            return state;
    }
};

export default reducer;
