import authSaga from "./auth/auth-saga";
import userSaga from "./user/user-saga";
import employerSaga from "./employer/employer-saga";
import { all, fork } from "redux-saga/effects";
export default function* rootSaga(): any {
  yield all([fork(authSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(employerSaga)]);
}
