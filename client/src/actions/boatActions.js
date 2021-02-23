import { BASE_URL } from "../config";

export const SET_BOATS_START = "SET_BOATS_START";
export const SET_BOATS_SUCCESS = "SET_BOATS_SUCCESS";
export const SET_BOATS_FAILURE = "SET_BOATS_FAILURE";

export const setBoatsStart = () => ({
  type: SET_BOATS_START,
});
export const setBoatsSuccess = (boats) => ({
  type: SET_BOATS_SUCCESS,
  boats,
});
export const setBoatsFailure = (error) => ({
  type: SET_BOATS_FAILURE,
  error,
});

export const setBoats = (tk) => async (dispatch) => {
  dispatch(setBoatsStart());
  const res = await fetch(`${BASE_URL}/api/boats`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setBoatsFailure("setBoats failure"));
  } else {
    const json = await res.json();
    dispatch(setBoatsSuccess(json.boats));
  }
};
