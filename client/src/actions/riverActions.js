import { BASE_URL } from "../config";

export const SET_RIVERS_START = "SET_RIVERS_START";
export const SET_RIVERS_SUCCESS = "SET_RIVERS_SUCCESS";
export const SET_RIVERS_FAILURE = "SET_RIVERS_FAILURE";
export const SET_ACCESSES_START = "SET_ACCESSES_START";
export const SET_ACCESSES_SUCCESS = "SET_ACCESSES_SUCCESS";
export const SET_ACCESSES_FAILURE = "SET_ACCESSES_FAILURE";

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

export const fetchRivers = (tk) => async (dispatch) => {
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
    dispatch(setRiversFailure("Fetch Rivers Failure"));
  } else {
    const json = await res.json();
    dispatch(setRiversSuccess(json.rivers));
  }
};

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
