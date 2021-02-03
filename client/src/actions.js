export const SET_USER = "SET_USER";
export const SET_RIVERS = "SET_RIVERS";

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const setRivers = (rivers) => ({
  type: SET_RIVERS,
  rivers,
});
