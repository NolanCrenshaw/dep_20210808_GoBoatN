import { BASE_URL } from "../config";

export const SET_VEHICLES_START = "SET_VEHICLES_START";
export const SET_VEHICLES_SUCCESS = "SET_VEHICLES_SUCCESS";
export const SET_VEHICLES_FAILURE = "SET_VEHICLES_FAILURE";
export const CREATE_VEHICLE_START = "CREATE_VEHICLE_START";
export const CREATE_VEHICLE_SUCCESS = "CREATE_VEHICLE_SUCCESS";
export const CREATE_VEHICLE_FAILURE = "CREATE_VEHICLE_FAILURE";
export const UPDATE_VEHICLE_START = "UPDATE_VEHICLE_START";
export const UPDATE_VEHICLE_SUCCESS = "UPDATE_VEHICLE_SUCCESS";
export const UPDATE_VEHICLE_FAILURE = "UPDATE_VEHICLE_FAILURE";
export const DELETE_VEHICLE_START = "DELETE_VEHICLE_START";
export const DELETE_VEHICLE_SUCCESS = "DELETE_VEHICLE_SUCCESS";
export const DELETE_VEHICLE_FAILURE = "DELETE_VEHICLE_FAILURE";

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
export const createVehicleStart = () => ({
  type: CREATE_VEHICLE_START,
});
export const createVehicleSuccess = (vehicle) => ({
  type: CREATE_VEHICLE_SUCCESS,
  vehicle,
});
export const createVehicleFailure = (error) => ({
  type: CREATE_VEHICLE_FAILURE,
  error,
});
export const updateVehicleStart = () => ({
  type: UPDATE_VEHICLE_START,
});
export const updateVehicleSuccess = (vehicle) => ({
  type: UPDATE_VEHICLE_SUCCESS,
  vehicle,
});
export const updateVehicleFailure = (error) => ({
  type: UPDATE_VEHICLE_FAILURE,
  error,
});
export const deleteVehicleStart = () => ({
  type: DELETE_VEHICLE_START,
});
export const deleteVehicleSuccess = (vehicleID) => ({
  type: DELETE_VEHICLE_SUCCESS,
  vehicleID,
});
export const deleteVehicleFailure = (error) => ({
  type: DELETE_VEHICLE_FAILURE,
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

export const createVehicle = (tk, vehicle) => async (dispatch) => {
  dispatch(createVehicleStart());
  const res = await fetch(`${BASE_URL}/api/vehicles`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(vehicle),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(createVehicleFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(createVehicleSuccess(json.vehicle));
  }
};

export const updateVehicle = (tk, vehicle) => async (dispatch) => {
  dispatch(updateVehicleStart());
  const res = await fetch(`${BASE_URL}/api/vehicles/${vehicle.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(vehicle),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(updateVehicleFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(updateVehicleSuccess(json.vehicle));
  }
};

export const deleteVehicle = (tk, vehicleID) => async (dispatch) => {
  dispatch(deleteVehicleStart());
  const res = await fetch(`${BASE_URL}/api/vehicles/${vehicleID}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(deleteVehicleFailure(json.message));
  } else {
    dispatch(deleteVehicleSuccess(vehicleID));
  }
};
