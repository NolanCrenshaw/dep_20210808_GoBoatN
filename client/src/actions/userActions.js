export const SET_USER_START = "SET_USER_START";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILURE = "SET_USER_FAILURE";

export const setUserStart = () => ({
  type: SET_USER_START,
});
export const setUserSuccess = (user) => ({
  type: SET_USER_SUCCESS,
  user,
});
export const setUserFailure = (error) => ({
  type: SET_USER_FAILURE,
  error,
});
