import { combineReducers } from "redux";
import userReducer from "./userReducer";
import riverReducer from "./riverReducer";
import pageReducer from "./pageReducer";
import tripReducer from "./tripReducer";
import friendReducer from "./friendReducer";
import boatReducer from "./boatReducer";

const rootReducer = combineReducers({
  pageState: pageReducer,
  user: userReducer,
  rivers: riverReducer,
  trips: tripReducer,
  friends: friendReducer,
  boats: boatReducer,
});

export default rootReducer;
