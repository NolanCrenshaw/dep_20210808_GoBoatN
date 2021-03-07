import {
  SET_TRIPS_START,
  SET_TRIPS_SUCCESS,
  SET_TRIPS_FAILURE,
  CREATE_TRIP_START,
  CREATE_TRIP_SUCCESS,
  CREATE_TRIP_FAILURE,
  UPDATE_TRIP_START,
  UPDATE_TRIP_SUCCESS,
  UPDATE_TRIP_FAILURE,
  DELETE_TRIP_START,
  DELETE_TRIP_SUCCESS,
  DELETE_TRIP_FAILURE,
} from "../actions/tripActions";

const initialState = {
  loading: false,
  error: false,
};

const tripReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_TRIPS_START:
      nextState.loading = true;
      return nextState;
    case SET_TRIPS_SUCCESS:
      nextState = { ...action.trips };
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case SET_TRIPS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
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
    case UPDATE_TRIP_START:
      nextState.loading = true;
      return nextState;
    case UPDATE_TRIP_SUCCESS:
      const mappedTrips = Object.values(newState).map((trip) => {
        if (trip.id === action.trip.id) {
          return action.trip;
        } else {
          return trip;
        }
      });
      nextState = { ...mappedTrips };
      nextState.loading = false;
      return nextState;
    case UPDATE_TRIP_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case DELETE_TRIP_START:
      nextState.loading = true;
      return nextState;
    case DELETE_TRIP_SUCCESS:
      const removedTripID = action.tripID;
      const filteredTrips = Object.values(newState).filter(
        (trip) => trip.id !== removedTripID
      );
      nextState = { ...filteredTrips };
      nextState.loading = false;
      return nextState;
    case DELETE_TRIP_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default tripReducer;
