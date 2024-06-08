import authSaga from "./auth/auth-saga";
import userSaga from "./user/user-saga";
import employerSaga from "./employer/employer-saga";
import companySaga from "./company/company-saga";
import fileSaga from "./file/file-saga";
import jobSaga from "./job/job-saga";
import productSaga from "./product/product-saga";
import paymentSaga from "./payment/payment-saga";
import cartSaga from "./cart/cart-saga";
import commonSaga from "./common/common-saga";
import candidateSaga from "./candidate/candidate-saga";
import purchasehistorySaga from "./purchase_history/purchase-history-saga";
import { all, fork } from "redux-saga/effects";
export default function* rootSaga(): any {
  yield all([fork(authSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(employerSaga)]);
  yield all([fork(companySaga)]);
  yield all([fork(jobSaga)]);
  yield all([fork(fileSaga)]);
  yield all([fork(productSaga)]);
  yield all([fork(paymentSaga)]);
  yield all([fork(cartSaga)]);
  yield all([fork(commonSaga)]);
  yield all([fork(candidateSaga)]);
  yield all([fork(purchasehistorySaga)]);
}
