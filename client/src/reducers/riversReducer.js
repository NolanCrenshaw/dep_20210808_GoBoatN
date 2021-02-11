import { SET_RIVERS } from "../components/actions/userActions";

const riversReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_RIVERS:
      return action.rivers;
    default:
      return state;
  }
};

export default riversReducer;
