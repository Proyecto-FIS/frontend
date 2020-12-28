import { type as START_SNACKBAR } from "../actions/SnackBar/startSnackBar";
import { type as SNACKBAR_FINISHED } from "../actions/SnackBar/snackBarFinished";

const defaultState = {
    severity: "success",
    message: "",
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case START_SNACKBAR:
            return { 
                severity: payload.severity, 
                message: payload.message
            };
        case SNACKBAR_FINISHED:
            return {
                ...state,
                message: ""
            };
        default:
            return state;
    }
};

export default reducer;
