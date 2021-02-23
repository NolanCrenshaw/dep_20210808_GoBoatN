import {
  SET_INVITES_START,
  SET_INVITES_SUCCESS,
  SET_INVITES_FAILURE,
} from "../actions/inviteActions";

const initialState = {
  loading: false,
  error: false,
};

const inviteReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_INVITES_START:
      nextState.loading = true;
      return nextState;
    case SET_INVITES_SUCCESS:
      nextState = { ...action.invites };
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case SET_INVITES_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return nextState;
  }
};

export default inviteReducer;
