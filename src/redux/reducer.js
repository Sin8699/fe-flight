import { combineReducers } from "redux";
import authReducer from "@/module/auth/reducer";

export default combineReducers({ ...authReducer });
