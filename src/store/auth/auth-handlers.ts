import { call, put } from "redux-saga/effects";
import { getToken, logOut, saveToken } from "../../utils/auth";
import {
  authUpdateUser,
  authUploadLoading,
  authUploadMessageRedux,
} from "./auth-slice";
import { requestAuthFetchMe, requestAuthLogin } from "./auth-requests";

function* handleAuthLogin(dataLogin: any): Generator<any> {
  try {
    yield put(authUploadLoading({ loading: true }));
    const response: any = yield call(requestAuthLogin, {
      username: dataLogin.payload.email,
      password: dataLogin.payload.password,
    });

    if (response.data.result.accessToken && response.data.result.refreshToken) {
      saveToken(
        response.data.result.accessToken,
        response.data.result.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error) {
  } finally {
    yield put(authUploadLoading({ loading: false }));
  }
}
function* handleAuthFetchMe(): Generator<any> {
  try {
    const { accessToken } = getToken();
    const response: any = yield call(requestAuthFetchMe, accessToken);
    if (response.data.code === 1000) {
      yield put(
        authUpdateUser({
          user: response.data.result.user,
          accessToken: accessToken,
        })
      );
    }
  } catch (error: any) {
    if (error?.response?.data?.message == "unauthenticated") {
      yield put(
        authUploadMessageRedux({ message: error?.response?.data?.message })
      );
    }
  } finally {
  }
}
function* handleAuthLogout(): Generator<any> {
  try {
    logOut();
    yield put(
      authUpdateUser({
        user: {},
        accessToken: "",
      })
    );
    console.log("logged out");
  } catch (error) {
  } finally {
  }
}
export { handleAuthLogin, handleAuthFetchMe, handleAuthLogout };
