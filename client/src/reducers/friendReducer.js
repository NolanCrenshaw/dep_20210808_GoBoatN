import {
  SET_FRIENDS_START,
  SET_FRIENDS_SUCCESS,
  SET_FRIENDS_FAILURE,
  ADD_FRIEND_START,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_FAILURE,
  UNFRIEND_START,
  UNFRIEND_SUCCESS,
  UNFRIEND_FAILURE,
} from "../actions/friendActions";

const initialState = {
  loading: false,
  error: false,
};

const friendReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_FRIENDS_START:
      nextState.loading = true;
      return nextState;
    case SET_FRIENDS_SUCCESS:
      nextState = { ...action.friends };
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case SET_FRIENDS_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case ADD_FRIEND_START:
      nextState.loading = true;
      return nextState;
    case ADD_FRIEND_SUCCESS:
      const newFriend = action.friend;
      nextState = { ...nextState, newFriend };
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case ADD_FRIEND_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case UNFRIEND_START:
      nextState.loading = true;
      return nextState;
    case UNFRIEND_SUCCESS:
      // ~~ TODO ~~
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case UNFRIEND_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return nextState;
  }
};

export default friendReducer;
