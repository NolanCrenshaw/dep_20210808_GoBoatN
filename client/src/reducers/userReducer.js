import {
  SET_USER_START,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
} from "../actions/userActions";

const initState = {
  loading: false,
  error: "",
  isLoggedIn: false,
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

const userReducer = (state = initState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_USER_START:
      nextState.loading = true;
      return nextState;
    case SET_USER_SUCCESS:
      nextState = action.user;
      nextState.isLoggedIn = true;
      nextState.loading = false;
      return nextState;
    case SET_USER_FAILURE:
      nextState.error = action.error;
      nextState.isLoggedIn = false;
      nextState.loading = false;
      return nextState;
    default:
      return state;
  }
};

export default userReducer;
