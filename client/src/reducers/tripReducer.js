import { CREATE_TRIP } from "../actions";

const tripReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TRIP:
      const token = window.localStorage.getItem("auth_token");

    default:
      return state;
  }
};

export default riversReducer;
