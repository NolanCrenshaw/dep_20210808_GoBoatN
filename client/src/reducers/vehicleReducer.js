import {
  SET_VEHICLES_START,
  SET_VEHICLES_SUCCESS,
  SET_VEHICLES_FAILURE,
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
    default:
      return state;
  }
};

export default vehicleReducer;
