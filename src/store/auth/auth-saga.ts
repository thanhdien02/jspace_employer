import { takeLatest } from "redux-saga/effects";
import { authFetchMe, authLogin, authLogout } from "./auth-slice";
import {
  handleAuthFetchMe,
  handleAuthLogin,
  handleAuthLogout,
} from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authFetchMe.type, handleAuthFetchMe);
  yield takeLatest(authLogout.type, handleAuthLogout);
}
