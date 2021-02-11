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
