import { combineReducers } from "redux";
import userReducer from "./userReducer";
import riversReducer from "./riversReducer";

const rootReducer = combineReducers({
  user: userReducer,
  rivers: riversReducer,
});

export default rootReducer;
