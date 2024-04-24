import { call, put } from "redux-saga/effects";
import { getToken, logOut, saveToken } from "../../utils/auth";
import { authUpdateFetchRedux, authUpdateLoadingRedux } from "./auth-slice";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefresh,
  requestAuthRegister,
} from "./auth-requests";
import { message } from "antd";

function* handleAuthLogin(dataLogin: any): Generator<any> {
  try {
    const response: any = yield call(requestAuthLogin, dataLogin.payload);

    yield put(authUpdateLoadingRedux({ loading: true }));
    if (response?.data?.result?.accessToken === "") {
      yield call(handleAuthRegister, { ...dataLogin.payload });
    } else {
      saveToken(
        response?.data?.result?.accessToken,
        response?.data?.result?.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error) {
  } finally {
    yield put(authUpdateLoadingRedux({ loading: false }));
  }
}
function* handleAuthFetchMe(): Generator<any> {
  try {
    const { accessToken } = getToken();
    const response: any = yield call(requestAuthFetchMe, accessToken);
    if (response?.data?.result?.role?.code == "EMPLOYEE") {
      yield put(
        authUpdateFetchRedux({
          accessToken: accessToken,
          user: response.data.result,
        })
      );
    } else if (response?.data?.result?.role?.code == "CANDIDATE") {
      logOut();
      message.error("Đây là tài khoản CANDIDATE. Đăng nhập thất bại");
    }
  } catch (error) {
  } finally {
  }
}

function* handleAuthRegister(dataRegister: any): Generator<any> {
  try {
    yield put(authUpdateLoadingRedux({ loading: true }));
    const response: any = yield call(
      requestAuthRegister,
      "EMPLOYEE",
      dataRegister
    );
    console.log(response?.result?.accessToken);
    if (response?.result?.accessToken != "") {
      saveToken(
        response?.data?.result?.accessToken,
        response?.data?.result?.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error) {
  } finally {
    yield put(authUpdateLoadingRedux({ loading: false }));
  }
}

function* handleAuthRefrestToken(): Generator<any> {
  try {
    const { refreshToken } = getToken();
    const response: any = yield call(requestAuthRefresh, refreshToken);
    if (response?.data?.result) {
      saveToken(response?.data?.result?.accessToken, refreshToken);
    }
  } catch (error) {
  } finally {
  }
}
function* handleAuthLogout(): Generator<any> {
  try {
    logOut();
    yield put(
      authUpdateFetchRedux({
        users: {},
        accessToken: "",
      })
    );
  } catch (error) {
  } finally {
  }
}
export {
  handleAuthLogin,
  handleAuthLogout,
  handleAuthFetchMe,
  handleAuthRegister,
  handleAuthRefrestToken,
};
