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

export const setFriends = async () => (dispatch) => {};
