import { BASE_URL } from "../config";

export const SET_TRIPS_START = "SET_TRIPS_START";
export const SET_TRIPS_SUCCESS = "SET_TRIPS_SUCCESS";
export const SET_TRIPS_FAILURE = "SET_TRIPS_FAILURE";
export const CREATE_TRIP_START = "CREATE_TRIP_START";
export const CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS";
export const CREATE_TRIP_FAILURE = "CREATE_TRIP_FAILURE";
export const UPDATE_TRIP_START = "UPDATE_TRIP_START";
export const UPDATE_TRIP_SUCCESS = "UPDATE_TRIP_SUCCESS";
export const UPDATE_TRIP_FAILURE = "UPDATE_TRIP_FAILURE";
export const DELETE_TRIP_START = "DELETE_TRIP_START";
export const DELETE_TRIP_SUCCESS = "DELETE_TRIP_SUCCESS";
export const DELETE_TRIP_FAILURE = "DELETE_TRIP_FAILURE";

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
export const updateTripStart = () => ({
  type: UPDATE_TRIP_START,
});
export const updateTripSuccess = (trip) => ({
  type: UPDATE_TRIP_SUCCESS,
  trip,
});
export const updateTripFailure = (error) => ({
  type: UPDATE_TRIP_FAILURE,
  error,
});
export const deleteTripStart = () => ({
  type: DELETE_TRIP_START,
});
export const deleteTripSuccess = (tripID) => ({
  type: DELETE_TRIP_SUCCESS,
  tripID,
});
export const deleteTripFailure = (error) => ({
  type: DELETE_TRIP_FAILURE,
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

export const createTrip = (tk, trip) => async (dispatch) => {
  dispatch(createTripStart());
  const res = await fetch(`${BASE_URL}/api/trips`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(trip),
  });
  if (!res.ok) {
    dispatch(createTripFailure("Create Trip Failure"));
  } else {
    const json = await res.json();
    dispatch(createTripSuccess(json.trip));
  }
};

export const updateTrip = (tk, trip) => async (dispatch) => {
  dispatch(updateTripStart());
  const res = await fetch(`${BASE_URL}/api/trips/${trip.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(trip),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(updateTripFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(updateTripSuccess(json));
  }
};

export const deleteTrip = (tk, tripID) => async (dispatch) => {
  dispatch(deleteTripStart());
  const res = await fetch(`${BASE_URL}/api/trips/${tripID}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(deleteTripFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(deleteTripSuccess(json));
  }
};
