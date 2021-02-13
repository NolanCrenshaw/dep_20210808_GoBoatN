import {
  CREATE_TRIP_START,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
} from "../actions/tripActions";

const initialState = {
  loading: false,
  error: "",
  list: {},
};

const tripReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case CREATE_TRIP_START:
      nextState.loading = true;
      return nextState;
    case CREATE_TRIP_SUCCESS:
      const trip = action.trip;
      nextState.list[trip.id] = trip;
      nextState.loading = false;
      return nextState;
    case CREATE_TRIP_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default tripReducer;
