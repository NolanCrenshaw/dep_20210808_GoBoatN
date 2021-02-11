import {
  SET_USER_START,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
} from "../actions/userActions";

const initState = {
  profile: {
    id: "",
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    zipcode: "",
    about: "",
    skill: 0,
    profile_pic: "",
    banner_pic: "",
    sprite: "",
  },
  boats: [],
  vehicles: [],
  friends: [],
  trips: [],
  invites: [],
};
// initial state set to empty object.
// default values may need to be handled by proper init state
const userReducer = (state = initState, action) => {
  Object.freeze(state);
  const nextState = { ...state };
  switch (action.type) {
    case SET_USER_START:
      nextState.loading = true;
      return nextState;
    case SET_USER_SUCCESS:
      nextState.user = action.user;
      nextState.loading = false;
      return nextState;
    case SET_USER_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default userReducer;
