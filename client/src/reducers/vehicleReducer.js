import {
  SET_VEHICLES_START,
  SET_VEHICLES_SUCCESS,
  SET_VEHICLES_FAILURE,
  CREATE_VEHICLE_START,
  CREATE_VEHICLE_SUCCESS,
  CREATE_VEHICLE_FAILURE,
  UPDATE_VEHICLE_START,
  UPDATE_VEHICLE_SUCCESS,
  UPDATE_VEHICLE_FAILURE,
  DELETE_VEHICLE_START,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_FAILURE,
} from "../actions/vehicleActions";

const vehicleReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_VEHICLES_START:
      nextState.loading = true;
      return nextState;
    case SET_VEHICLES_SUCCESS:
      nextState = action.vehicles;
      nextState.loading = false;
      return nextState;
    case SET_VEHICLES_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case CREATE_VEHICLE_START:
      nextState.loading = true;
      return nextState;
    case CREATE_VEHICLE_SUCCESS:
      const newVehicle = action.vehicle;
      nextState = { ...nextState, newVehicle };
      nextState.loading = false;
      return nextState;
    case CREATE_VEHICLE_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case UPDATE_VEHICLE_START:
      nextState.loading = true;
      return nextState;
    case UPDATE_VEHICLE_SUCCESS:
      const mappedVehicles = Object.values(newState).map((vehicle) => {
        if (vehicle.id === action.vehicle.id) {
          return action.vehicle;
        } else {
          return vehicle;
        }
      });
      nextState = { ...mappedVehicles };
      nextState.loading = false;
      return nextState;
    case UPDATE_VEHICLE_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case DELETE_VEHICLE_START:
      nextState.loading = true;
      return nextState;
    case DELETE_VEHICLE_SUCCESS:
      const filteredVehicles = Object.values(newState).filter(
        (vehicle) => vehicle.id !== action.vehicleID
      );
      nextState = { ...filteredVehicles };
      nextState.loading = false;
      return nextState;
    case DELETE_VEHICLE_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default vehicleReducer;
