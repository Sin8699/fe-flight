import { combineReducers } from "redux";
import authReducer from "@/module/auth/reducer";
import flightReducer from "@/module/flight/reducer";
import airportReducer from "@/module/airport/reducer";
import middleAirportReducer from "@/module/middle-airport/reducer";
import saleReducer from "@/module/history-sale/reducer";

export default combineReducers({
  ...authReducer,
  ...flightReducer,
  ...airportReducer,
  ...middleAirportReducer,
  ...saleReducer,
});
