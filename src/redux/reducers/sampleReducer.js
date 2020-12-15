import { type as sampleActionType } from "../actions/sampleAction";

const defaultState = "salsa";

const reducer = (state = defaultState, { type, payload }) => {
    switch(type) {
        case sampleActionType:
            return payload;   // Implement action
        default:
            return state;
    }
};

// Remember to add it to store.js
export default reducer;
