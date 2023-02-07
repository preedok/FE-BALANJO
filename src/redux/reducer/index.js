import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: usersReducer,
});
export default rootReducer;
