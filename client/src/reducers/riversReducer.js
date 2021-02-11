import {
  SET_RIVERS_START,
  SET_RIVERS_SUCCESS,
  SET_RIVERS_FAILURE,
} from "../actions/riverActions";

const riverReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case SET_RIVERS_START:
      nextState.loading = true;
      return nextState;
    case SET_RIVERS_SUCCESS:
      nextState.rivers = action.rivers;
      nextState.loading = false;
      return nextState;
    case SET_RIVERS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default riverReducer;
