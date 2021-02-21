import {
  SET_FRIENDS_START,
  SET_FRIENDS_SUCCESS,
  SET_FRIENDS_FAILURE,
} from "../actions/friendsActions";

const initialState = {
  loading: false,
  error: false,
};

const friendsReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_FRIENDS_START:
      nextState.loading = true;
      return nextState;
    case SET_FRIENDS_SUCCESS:
      nextState = action.friends;
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case SET_FRIENDS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return nextState;
  }
};

export default friendsReducer;
