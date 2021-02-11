export const CREATE_TRIP_START = "CREATE_TRIP_START";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS";
export const CREATE_TRIP_FAILURE = "CREATE_TRIP_FAILURE";

export const createTripStart = () => ({
  type: CREATE_TRIP_START,
});
export const createTripSuccess = (trip) => ({
  type: CREATE_TRIP_SUCCESS,
  trip,
});
export const createTripFailure = (error) => ({
  type: CREATE_TRIP_FAILURE,
  error,
});
