import { BASE_URL } from "../config";

export const SET_RIVERS_START = "SET_RIVERS_START";
export const SET_RIVERS_SUCCESS = "SET_RIVERS_SUCCESS";
export const SET_RIVERS_FAILURE = "SET_RIVERS_FAILURE";

export const setRiversStart = () => ({
  type: SET_RIVERS_START,
});
export const setRiversSuccess = (rivers) => ({
  type: SET_RIVERS_SUCCESS,
  rivers,
});
export const setRiversFailure = (error) => ({
  type: SET_RIVERS_FAILURE,
  error,
});

export const fetchRiversThunk = (tk) => async (dispatch) => {
  dispatch(setRiversStart());
  const res = await fetch(`${BASE_URL}/api/rivers/`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setRiversFailure("Fetch Rivers Failure"));
  } else {
    const json = await res.json();
    dispatch(setRiversSuccess(json.rivers));
  }
};
