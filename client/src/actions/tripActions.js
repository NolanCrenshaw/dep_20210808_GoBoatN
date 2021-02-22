import { BASE_URL } from "../config";

export const SET_TRIPS_START = "SET_TRIPS_START";
export const SET_TRIPS_SUCCESS = "SET_TRIPS_SUCCESS";
export const SET_TRIPS_FAILURE = "SET_TRIPS_FAILURE";
export const CREATE_TRIP_START = "CREATE_TRIP_START";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS";
export const CREATE_TRIP_FAILURE = "CREATE_TRIP_FAILURE";

export const setTripsStart = () => ({
  type: SET_TRIPS_START,
});
export const setTripsSuccess = (trips) => ({
  type: SET_TRIPS_SUCCESS,
  trips,
});
export const setTripsFailure = (error) => ({
  type: SET_TRIPS_FAILURE,
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

export const setTrips = (tk) => async (dispatch) => {
  dispatch(setTripsStart());
  const res = await fetch(`${BASE_URL}/api/trips/`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setTripsFailure("setTrips failure"));
  } else {
    const json = await res.json();
    dispatch(setTripsSuccess(json.trips));
  }
};

export const createTrip = (tk, data) => async (dispatch) => {
  dispatch(createTripStart());
  const res = await fetch(`${BASE_URL}/api/trips`, {
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
