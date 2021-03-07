import {
  SET_BOATS_START,
  SET_BOATS_SUCCESS,
  SET_BOATS_FAILURE,
  CREATE_BOAT_START,
  CREATE_BOAT_SUCCESS,
  CREATE_BOAT_FAILURE,
  UPDATE_BOAT_START,
  UPDATE_BOAT_SUCCESS,
  UPDATE_BOAT_FAILURE,
  DELETE_BOAT_START,
  DELETE_BOAT_SUCCESS,
  DELETE_BOAT_FAILURE,
} from "../actions/boatActions";

const boatReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_BOATS_START:
      nextState.loading = true;
      return nextState;
    case SET_BOATS_SUCCESS:
      nextState = action.boats;
      nextState.loading = false;
      return nextState;
    case SET_BOATS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case CREATE_BOAT_START:
      nextState.loading = true;
      return nextState;
    case CREATE_BOAT_SUCCESS:
      const newBoat = action.boat;
      nextState = { ...nextState, newBoat };
      nextState.loading = false;
      return nextState;
    case CREATE_BOAT_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case UPDATE_BOAT_START:
      nextState.loading = true;
      return nextState;
    case UPDATE_BOAT_SUCCESS:
      // ~~ TODO ~~
      nextState.loading = false;
      return nextState;
    case UPDATE_BOAT_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case DELETE_BOAT_START:
      nextState.loading = true;
      return nextState;
    case DELETE_BOAT_SUCCESS:
      // ~~ TODO ~~
      nextState.loading = false;
      return nextState;
    case DELETE_BOAT_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default boatReducer;
