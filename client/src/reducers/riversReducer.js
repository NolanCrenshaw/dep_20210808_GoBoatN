import { SET_RIVERS } from "../actions";

const riversReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_RIVERS:
      return action.rivers;
    default:
      return state;
  }
};

export default riversReducer;
