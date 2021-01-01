import { type as START_LOADER } from "../actions/Loader/startLoader";
import { type as FINISH_LOADER } from "../actions/Loader/finishLoader";

const defaultState = {
    elements: null
};

const reducer = (state = defaultState, { type, payload }) => {

    switch (type) {
        case START_LOADER:
            return { 
                elements: null
            };
        case FINISH_LOADER:
            return {
                elements: payload.elements
            };
        default:
            return state;
    }
};

export default reducer;
