import authSaga from "./auth/auth-saga";
import userSaga from "./user/user-saga";
import adminSaga from "./admin/admin-saga";
import { all, fork } from "redux-saga/effects";
export default function* rootSaga(): any {
  yield all([fork(authSaga)]);
  yield all([fork(userSaga)]);
  yield all([fork(adminSaga)]);
}
