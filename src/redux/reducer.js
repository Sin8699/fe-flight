import { combineReducers } from "redux";
import authReducer from "@/module/auth/reducer";
import flightReducer from "@/module/flight/reducer";

export default combineReducers({ ...authReducer, ...flightReducer });
