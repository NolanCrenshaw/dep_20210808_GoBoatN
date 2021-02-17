import { BASE_URL } from "../config";

export const SET_USER_START = "SET_USER_START";
export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SET_USER_FAILURE = "SET_USER_FAILURE";
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

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
export const loginStart = () => ({
  type: LOGIN_START,
});
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});
export const logout = () => ({
  type: LOGOUT,
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

export const login = (data) => async (dispatch) => {
  dispatch(loginStart());
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    dispatch(loginFailure("login failure"));
  } else {
    const json = await res.json();
    window.localStorage.setItem("auth_token", json.auth_token);
    dispatch(loginSuccess());
    dispatch(setUser(json.auth_token));
  }
};
