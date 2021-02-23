import { BASE_URL } from "../config";

export const SET_VEHICLES_START = "SET_VEHICLES_START";
export const SET_VEHICLES_SUCCESS = "SET_VEHICLES_SUCCESS";
export const SET_VEHICLES_FAILURE = "SET_VEHICLES_FAILURE";

export const setVehiclesStart = () => ({
  type: SET_VEHICLES_START,
});
export const setVehiclesSuccess = (vehicles) => ({
  type: SET_VEHICLES_SUCCESS,
  vehicles,
});
export const setVehiclesFailure = (error) => ({
  type: SET_VEHICLES_FAILURE,
  error,
});

export const setVehicles = (tk) => async (dispatch) => {
  dispatch(setVehiclesStart());
  const res = await fetch(`${BASE_URL}/api/vehicles`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setVehiclesFailure("setVehicles failure"));
  } else {
    const json = await res.json();
    dispatch(setVehiclesSuccess(json.vehicles));
  }
};
