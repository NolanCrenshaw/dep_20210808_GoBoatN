import { BASE_URL } from "../config";

export const SET_RIVERS_START = "SET_RIVERS_START";
export const SET_RIVERS_SUCCESS = "SET_RIVERS_SUCCESS";
export const SET_RIVERS_FAILURE = "SET_RIVERS_FAILURE";
export const SET_ACCESSES_START = "SET_ACCESSES_START";
export const SET_ACCESSES_SUCCESS = "SET_ACCESSES_SUCCESS";
export const SET_ACCESSES_FAILURE = "SET_ACCESSES_FAILURE";
export const CREATE_RIVER_START = "CREATE_RIVER_START";
export const CREATE_RIVER_SUCCESS = "CREATE_RIVER_SUCCESS";
export const CREATE_RIVER_FAILURE = "CREATE_RIVER_FAILURE";
export const UPDATE_RIVER_START = "UPDATE_RIVER_START";
export const UPDATE_RIVER_SUCCESS = "UPDATE_RIVER_SUCCESS";
export const UPDATE_RIVER_FAILURE = "UPDATE_RIVER_FAILURE";

export const setRiversStart = () => ({
  type: SET_RIVERS_START,
});
export const setRiversSuccess = (rivers) => ({
  type: SET_RIVERS_SUCCESS,
  rivers,
});
export const setRiversFailure = (error) => ({
  type: SET_RIVERS_FAILURE,
  error,
});
export const setAccessesStart = () => ({
  type: SET_ACCESSES_START,
});
export const setAccessesSuccess = (accesses, riverID) => ({
  type: SET_ACCESSES_SUCCESS,
  accesses,
  riverID,
});
export const setAccessesFailure = (error) => ({
  type: SET_ACCESSES_FAILURE,
  error,
});
export const createRiverStart = () => ({
  type: CREATE_RIVER_START,
});
export const createRiverSuccess = (river) => ({
  type: CREATE_RIVER_SUCCESS,
  river,
});
export const createRiverFailure = (error) => ({
  type: CREATE_RIVER_FAILURE,
  error,
});
export const updateRiverStart = () => ({
  type: UPDATE_RIVER_START,
});
export const updateRiverSuccess = (river) => ({
  type: UPDATE_RIVER_SUCCESS,
  river,
});
export const updateRiverFailure = (error) => ({
  type: UPDATE_RIVER_FAILURE,
  error,
});

export const setRivers = (tk) => async (dispatch) => {
  dispatch(setRiversStart());
  const res = await fetch(`${BASE_URL}/api/rivers/`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(setRiversFailure(json.message));
  } else {
    const json = await res.json();
    dispatch(setRiversSuccess(json.rivers));
  }
};

export const createRiver = (tk, river) => async (dispatch) => {
  dispatch(createRiverStart());
  const res = await fetch(`${BASE_URL}/api/rivers/`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(river),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(createRiverFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(createRiverSuccess(json.river));
  }
};

export const updateRiver = (tk, river) => async (dispatch) => {
  dispatch(updateRiverStart());
  const res = await fetch(`${BASE_URL}/api/rivers/${river.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tk}`,
    },
    body: JSON.stringify(river),
  });
  if (!res.ok) {
    const json = await res.json();
    dispatch(updateRiverFailure(json.message));
  } else {
    // ~~ TODO ~~
    // Decide single source of truth
    const json = await res.json();
    dispatch(updateRiverSuccess(json.river));
  }
};

/*
  THIS CODE IS NOW HANDLED IN CHILD COMPONENT RENDERING RIVER
*/
// export const fetchAccesses = (tk, id) => async (dispatch) => {
//   dispatch(setAccessesStart());
//   const res = await fetch(`${BASE_URL}/api/rivers/accesses/${id}/`, {
//     method: "GET",
//     mode: "cors",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${tk}`,
//     },
//   });
//   if (!res.ok) {
//     const text = await res.status;
//     console.log(`res: ${text}`);
//     dispatch(setAccessesFailure("fetchAccesses failure"));
//   } else {
//     const json = await (await res).json;
//     dispatch(setAccessesSuccess(json.accesses, id));
//   }
// };
