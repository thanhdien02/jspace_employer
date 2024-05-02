import authSaga from "./auth/auth-saga";
import userSaga from "./user/user-saga";
import employerSaga from "./employer/employer-saga";
import companySaga from "./company/company-saga";
import fileSaga from "./file/file-saga";
import { all, fork } from "redux-saga/effects";
export default function* rootSaga(): any {
  yield all([fork(authSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(employerSaga)]);
  yield all([fork(companySaga)]);
  yield all([fork(fileSaga)]);
}
