import {
  SET_USER_START,
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from "../actions/userActions";

const initialState = {
  loading: false,
  error: false,
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

const userReducer = (state = initialState, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    case SET_USER_START:
      nextState.loading = true;
      return nextState;
    case SET_USER_SUCCESS:
      nextState = action.user;
      nextState.isLoggedIn = true;
      nextState.error = false;
      nextState.loading = false;
      return nextState;
    case SET_USER_FAILURE:
      nextState.error = action.error;
      nextState.isLoggedIn = false;
      nextState.loading = false;
      return nextState;
    case LOGIN_START:
      nextState.loading = true;
      return nextState;
    case LOGIN_SUCCESS:
      /*
      No login redux action required.
      auth_token handles login state.
      auth_token is watched by useEffect().
      */
      nextState.loading = false;
      return nextState;
    case LOGIN_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case SIGNUP_START:
      nextState.loading = true;
      return nextState;
    case SIGNUP_SUCCESS:
      nextState.loading = false;
      return nextState;
    case SIGNUP_FAILURE:
      nextState.error = action.error;
      nextState.loading = false;
      return nextState;
    case LOGOUT:
      nextState = initialState;
      return nextState;
    default:
      return nextState;
  }
};

export default userReducer;
