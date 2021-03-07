import { BASE_URL } from "../config";

export const SET_BOATS_START = "SET_BOATS_START";
export const SET_BOATS_SUCCESS = "SET_BOATS_SUCCESS";
export const SET_BOATS_FAILURE = "SET_BOATS_FAILURE";
export const CREATE_BOAT_START = "CREATE_BOAT_START";
export const CREATE_BOAT_SUCCESS = "CREATE_BOAT_SUCCESS";
export const CREATE_BOAT_FAILURE = "CREATE_BOAT_FAILURE";
export const UPDATE_BOAT_START = "UPDATE_BOAT_START";
export const UPDATE_BOAT_SUCCESS = "UPDATE_BOAT_SUCCESS";
export const UPDATE_BOAT_FAILURE = "UPDATE_BOAT_FAILURE";
export const DELETE_BOAT_START = "DELETE_BOAT_START";
export const DELETE_BOAT_SUCCESS = "DELETE_BOAT_SUCCESS";
export const DELETE_BOAT_FAILURE = "DELETE_BOAT_FAILURE";

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
export const createBoatStart = () => ({
  type: CREATE_BOAT_START,
});
export const createBoatSuccess = (boat) => ({
  type: CREATE_BOAT_SUCCESS,
  boat,
});
export const createBoatFailure = (error) => ({
  type: CREATE_BOAT_FAILURE,
  error,
});
export const updateBoatStart = () => ({
  type: UPDATE_BOAT_START,
});
export const updateBoatSuccess = (boat) => ({
  type: UPDATE_BOAT_SUCCESS,
  boat,
});
export const updateBoatFailure = (error) => ({
  type: UPDATE_BOAT_FAILURE,
  error,
});
export const deleteBoatStart = () => ({
  type: DELETE_BOAT_START,
});
export const deleteBoatSuccess = (boatID) => ({
  type: DELETE_BOAT_SUCCESS,
  boatID,
});
export const deleteBoatFailure = (error) => ({
  type: DELETE_BOAT_FAILURE,
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

export const createBoat = (tk, boat) => async (dispatch) => {
  dispatch(createBoatStart());
  const res = await fetch(`${BASE_URL}/api/boats`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(boat),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(createBoatFailure(json.message));
  } else {
    dispatch(createBoatSuccess(boat));
  }
};

export const updateBoat = (tk, boat) => async (dispatch) => {
  dispatch(updateBoatStart());
  const res = await fetch(`${BASE_URL}/api/boats/${boat.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(boat),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(updateBoatFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth for Boat Object
    const json = await res.json();
    dispatch(updateBoatSuccess(json.boat));
  }
};

export const deleteBoat = (tk, boat) => async (dispatch) => {
  dispatch(deleteBoatStart());
  const res = await fetch(`${BASE_URL}/api/boats/${boat.id}`, {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(deleteBoatFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth for Boat Object
    const json = await res.json();
    dispatch(deleteBoatSuccess(json.boat.id));
  }
};
