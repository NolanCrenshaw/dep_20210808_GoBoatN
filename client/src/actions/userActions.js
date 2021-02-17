import { BASE_URL } from "../config";

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

export const setUser = (tk) => async (dispatch) => {
  dispatch(setUserStart());
  const res = await fetch(`${BASE_URL}/api/users/token`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setUserFailure("setUser failure"));
  } else {
    const json = await res.json();
    dispatch(setUserSuccess(json));
  }
};
