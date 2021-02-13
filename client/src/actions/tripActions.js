import { BASE_URL } from "../config";

export const POPULATE_TRIPS_START = "POPULATE_TRIPS_START";
export const POPULATE_TRIPS_SUCCESS = "POPULATE_TRIPS_SUCCESS";
export const POPULATE_TRIPS_FAILURE = "POPULATE_TRIPS_FAILURE";
export const CREATE_TRIP_START = "CREATE_TRIP_START";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS";
export const CREATE_TRIP_FAILURE = "CREATE_TRIP_FAILURE";

export const populateTripsStart = () => ({
  type: POPULATE_TRIPS_START,
});
export const populateTripsSuccess = (trips) => ({
  type: POPULATE_TRIPS_SUCCESS,
  trips,
});
export const populateTripsFailure = (error) => ({
  type: POPULATE_TRIPS_FAILURE,
  error,
});

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

export const createTripThunk = (tk, data) => async (dispatch) => {
  dispatch(createTripStart());
  const res = await fetch(`${BASE_URL}/api/trips/create`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    dispatch(createTripFailure("Create Trip Failure"));
  } else {
    const json = await res.json();
    dispatch(createTripSuccess(json));
  }
};
