import { combineReducers } from "redux";
import userReducer from "./userReducer";
import riverReducer from "./riversReducer";
import pageReducer from "./pageReducer";
import tripReducer from "./tripReducer";
import friendsReducer from "./friendsReducer";

const rootReducer = combineReducers({
  pageState: pageReducer,
  user: userReducer,
  rivers: riverReducer,
  trips: tripReducer,
  friends: friendsReducer,
});

export default rootReducer;
