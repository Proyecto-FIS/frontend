import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const defaultState = [];

const reducer = (state = defaultState, { type, payload }) => {

  switch (type) {
    case SET_ALERT:
      return [...state, payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }

};

export default reducer;