import authReducer from "./auth/auth-slice";
import userReducer from "./user/user-slice";
import employerReducer from "./employer/employer-slice";
import commonReducer from "./common/common-slice";
import companyReducer from "./company/company-slice";
import fileReducer from "./file/file-slice";
import jobReducer from "./job/job-slice";
import paymentReducer from "./payment/payment-slice";
import productReducer from "./product/product-slice";
import cartReducer from "./cart/cart-slice";
import { combineReducers } from "@reduxjs/toolkit";

export const reducer: any = combineReducers({
  auth: authReducer,
  user: userReducer,
  employer: employerReducer,
  common: commonReducer,
  file: fileReducer,
  company: companyReducer,
  job: jobReducer,
  payment: paymentReducer,
  cart: cartReducer,
  product: productReducer,
});
