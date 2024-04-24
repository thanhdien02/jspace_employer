import { takeLatest } from "redux-saga/effects";
import { authFetchMe, authLogin, authLogout, authRefreshToken } from "./auth-slice";
import {
  handleAuthFetchMe,
  handleAuthLogin,
  handleAuthLogout,
  handleAuthRefrestToken,
} from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authFetchMe.type, handleAuthFetchMe);
  yield takeLatest(authRefreshToken.type, handleAuthRefrestToken);
  yield takeLatest(authLogout.type, handleAuthLogout);
}
