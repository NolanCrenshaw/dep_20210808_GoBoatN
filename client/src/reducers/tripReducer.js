import {
  CREATE_TRIP_START,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
} from "../components/actions/userActions";

const tripReducer = (state = {}, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case CREATE_TRIP_START:
      nextState.loading = true;
      return nextState;
    case CREATE_TRIP_SUCCESS:
      nextState.user = action.user;
      return nextState;
    case CREATE_TRIP_FAILURE:
      nextState.error = action.error;
      return nextState;
    default:
      return state;
  }
};

export default tripReducer;
