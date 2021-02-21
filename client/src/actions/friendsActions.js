import { BASE_URL } from "../config";

export const SET_FRIENDS_START = "SET_FRIENDS_START";
export const SET_FRIENDS_SUCCESS = "SET_FRIENDS_SUCCESS";
export const SET_FRIENDS_FAILURE = "SET_FRIENDS_FAILURE";

export const setFriendsStart = () => ({
  type: SET_FRIENDS_START,
});
export const setFriendsSuccess = (friends) => ({
  type: SET_FRIENDS_SUCCESS,
  friends,
});
export const setFriendsFailure = (error) => ({
  type: SET_FRIENDS_FAILURE,
  error,
});

export const setFriends = (tk) => async (dispatch) => {
  dispatch(setFriendsStart());
  const res = await fetch(`${BASE_URL}/api/users/friends`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(setFriendsFailure("setFriends failure"));
  } else {
    const json = await res.json();
    dispatch(setFriendsSuccess(json.friends));
  }
};
