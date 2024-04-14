import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import adminReducer from "./admin/admin-slice";
import commonReducer from "./common/common-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer: any = combineReducers({
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  common: commonReducer,
});
