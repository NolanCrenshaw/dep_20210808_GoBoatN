import { combineReducers } from "redux";
import userReducer from "./userReducer";
import riverReducer from "./riverReducer";
import pageReducer from "./pageReducer";
import tripReducer from "./tripReducer";
import friendReducer from "./friendReducer";
import boatReducer from "./boatReducer";
import vehicleReducer from "./vehicleReducer";

const rootReducer = combineReducers({
  pageState: pageReducer,
  user: userReducer,
  rivers: riverReducer,
  trips: tripReducer,
  friends: friendReducer,
  boats: boatReducer,
  vehicles: vehicleReducer,
});

export default rootReducer;
