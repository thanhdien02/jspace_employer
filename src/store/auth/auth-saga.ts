import { takeLatest } from "redux-saga/effects";
import {
  authFetchMe,
  authLogin,
  authLoginWithEmailPassword,
  authLogout,
  authRefreshToken,
  authRegister,
} from "./auth-slice";
import {
  handleAuthFetchMe,
  handleAuthLogin,
  handleAuthLoginWithEmailPassword,
  handleAuthLogout,
  handleAuthRefrestToken,
  handleAuthRegister,
} from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(
    authLoginWithEmailPassword.type,
    handleAuthLoginWithEmailPassword
  );
  yield takeLatest(authFetchMe.type, handleAuthFetchMe);
  yield takeLatest(authRefreshToken.type, handleAuthRefrestToken);
  yield takeLatest(authLogout.type, handleAuthLogout);
}
