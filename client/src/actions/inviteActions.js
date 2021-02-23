import { BASE_URL } from "../config";

export const SET_INVITES_START = "SET_INVITES_START";
export const SET_INVITES_SUCCESS = "SET_INVITES_SUCCESS";
export const SET_INVITES_FAILURE = "SET_INVITES_FAILURE";

export const setInvitesStart = () => ({
  type: SET_INVITES_START,
});
export const setInvitesSuccess = (invites) => ({
  type: SET_INVITES_SUCCESS,
  invites,
});
export const setInvitesFailure = (error) => ({
  type: SET_INVITES_FAILURE,
  error,
});

export const setInvites = (tk) => async (dispatch) => {
  dispatch(setInvitesStart());
  const res = await fetch(`${BASE_URL}/api/invites`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setInvitesFailure("setInvites failure"));
  } else {
    const json = await res.json();
    dispatch(setInvitesSuccess(json.invites));
  }
};
