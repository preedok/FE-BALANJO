import { combineReducers } from "@reduxjs/toolkit";
import { usersReducer } from "./userReducer";
import { productReducer } from "./productReducer";

const rootReducer = combineReducers({
  user: usersReducer,
  product: productReducer,
});
export default rootReducer;
