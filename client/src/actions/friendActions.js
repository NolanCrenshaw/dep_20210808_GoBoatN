import { BASE_URL } from "../config";

export const SET_FRIENDS_START = "SET_FRIENDS_START";
export const SET_FRIENDS_SUCCESS = "SET_FRIENDS_SUCCESS";
export const SET_FRIENDS_FAILURE = "SET_FRIENDS_FAILURE";
export const ADD_FRIEND_START = "ADD_FRIEND_START";
export const ADD_FRIEND_SUCCESS = "ADD_FRIEND_SUCCESS";
export const ADD_FRIEND_FAILURE = "ADD_FRIEND_FAILURE";
export const UNFRIEND_START = "UNFRIEND_START";
export const UNFRIEND_SUCCESS = "UNFRIEND_SUCCESS";
export const UNFRIEND_FAILURE = "UNFRIEND_FAILURE";

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
export const addFriendStart = () => ({
  type: ADD_FRIEND_START,
});
export const addFriendSuccess = (friend) => ({
  type: ADD_FRIEND_SUCCESS,
  friend,
});
export const addFriendFailure = (error) => ({
  type: ADD_FRIEND_FAILURE,
  error,
});
export const unfriendStart = () => ({
  type: UNFRIEND_START,
});
export const unfriendSuccess = (friendID) => ({
  type: UNFRIEND_SUCCESS,
  friendID,
});
export const unfriendFailure = (error) => ({
  type: UNFRIEND_FAILURE,
  error,
});

export const setFriends = (tk) => async (dispatch) => {
  dispatch(setFriendsStart());
  const res = await fetch(`${BASE_URL}/api/friends`, {
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

export const addFriend = (tk, friend) => async (dispatch) => {
  dispatch(addFriendStart());
  const res = await fetch(`${BASE_URL}/api/friends`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(friend),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(addFriendFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    dispatch(addFriendSuccess(friend));
  }
};

export const unfriend = (tk, friend) => async (dispatch) => {
  dispatch(unfriendStart());
  const res = await fetch(`${BASE_URL}/api/friends/${friend.id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    dispatch(unfriendFailure("setFriends failure"));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(unfriendSuccess(friend));
  }
};
