import { combineReducers } from "redux";
import userReducer from "./userReducer";
import riversReducer from "./riversReducer";
import pageReducer from "./pageReducer";
import tripReducer from "./tripReducer";

const rootReducer = combineReducers({
  pageState: pageReducer,
  user: userReducer,
  rivers: riversReducer,
  trip: tripReducer,
});

export default rootReducer;
