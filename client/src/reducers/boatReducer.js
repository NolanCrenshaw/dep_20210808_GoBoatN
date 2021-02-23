import {
  SET_BOATS_START,
  SET_BOATS_SUCCESS,
  SET_BOATS_FAILURE,
} from "../actions/boatActions";

const boatReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_BOATS_START:
      nextState.loading = true;
      return nextState;
    case SET_BOATS_SUCCESS:
      nextState = action.boats;
      nextState.loading = false;
      return nextState;
    case SET_BOATS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default boatReducer;
