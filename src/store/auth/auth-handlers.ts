import { call, put } from "redux-saga/effects";
import { getToken, logOut, saveToken } from "../../utils/auth";
import {
  authUpdateCheckAuthRedux,
  authUpdateEmailPasswordLoadingRedux,
  authUpdateFetchRedux,
  authUpdateLoadingRedux,
  authUpdateMessageRedux,
} from "./auth-slice";
import {
  requestAuthFetchMe,
  requestAuthLogin,
  requestAuthRefresh,
  requestAuthRegisterV2,
} from "./auth-requests";
import { message } from "antd";

function* handleAuthLogin(dataLogin: any): Generator<any> {
  try {
    const response: any = yield call(requestAuthLogin, dataLogin.payload);

    yield put(authUpdateLoadingRedux({ loading: true }));
    if (response?.data?.result?.accessToken === "") {
      // yield call(handleAuthRegister, { ...dataLogin.payload });
      yield put(authUpdateMessageRedux({ messageAuth: "register" }));
    } else {
      saveToken(
        response?.data?.result?.accessToken,
        response?.data?.result?.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error: any) {
    logOut();
    message.error(error?.response?.data?.message);
  } finally {
    yield put(authUpdateLoadingRedux({ loading: false }));
  }
}
function* handleAuthLoginWithEmailPassword(dataLogin: any): Generator<any> {
  try {
    const response: any = yield call(requestAuthLogin, dataLogin.payload);

    yield put(
      authUpdateEmailPasswordLoadingRedux({ loadingEmailPassword: true })
    );
    if (response?.data?.result?.accessToken === "") {
    } else {
      saveToken(
        response?.data?.result?.accessToken,
        response?.data?.result?.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error: any) {
    logOut();
    message.error(error?.response?.data?.message);
  } finally {
    yield put(
      authUpdateEmailPasswordLoadingRedux({ loadingEmailPassword: false })
    );
  }
}
function* handleAuthFetchMe(): Generator<any> {
  try {
    yield put(authUpdateLoadingRedux({ loading: true }));
    const { accessToken } = getToken();
    const response: any = yield call(requestAuthFetchMe, accessToken);
    if (response?.data?.result?.user?.role?.code == "EMPLOYEE") {
      yield put(
        authUpdateFetchRedux({
          accessToken: accessToken,
          user: response.data.result.user,
          companyAuth: response.data.result.company,
        })
      );
      yield put(
        authUpdateCheckAuthRedux({
          checkAuth: {
            verifiedByCompany: response?.data?.result?.verifiedByCompany,
            hasFullCredentialInfo:
              response?.data?.result?.hasFullCredentialInfo,
            hasCompany: response?.data?.result?.hasCompany,
            companyVerified: response?.data?.result?.companyVerified,
          },
        })
      );
    } else if (response?.data?.result?.user?.role?.code == "CANDIDATE") {
      message.error("Đây là tài khoản CANDIDATE.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
    if (error.response.data.message === "Do not permission") {
      logOut();
      yield put(authUpdateMessageRedux({ messageAuth: "notpermission" }));
    } else {
      yield put(
        authUpdateMessageRedux({ messageAuth: error?.response?.data?.message })
      );
    }
  } finally {
    yield put(authUpdateLoadingRedux({ loading: false }));
  }
}

function* handleAuthRegister(dataRegister: any): Generator<any> {
  try {
    yield put(authUpdateLoadingRedux({ loading: true }));
    const response: any = yield call(
      requestAuthRegisterV2,
      dataRegister?.payload
    );
    if (response?.result?.accessToken != "") {
      saveToken(
        response?.data?.result?.accessToken,
        response?.data?.result?.refreshToken
      );
      yield call(handleAuthFetchMe);
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(authUpdateLoadingRedux({ loading: false }));
  }
}

// function* handleAuthRegister(dataRegister: any): Generator<any> {
//   try {
//     yield put(authUpdateLoadingRedux({ loading: true }));
//     const response: any = yield call(
//       requestAuthRegister,
//       "EMPLOYEE",
//       dataRegister
//     );
//     if (response?.result?.accessToken != "") {
//       saveToken(
//         response?.data?.result?.accessToken,
//         response?.data?.result?.refreshToken
//       );
//       yield call(handleAuthFetchMe);
//     }
//   } catch (error: any) {
//     message.error(error?.response?.data?.message);
//   } finally {
//     yield put(authUpdateLoadingRedux({ loading: false }));
//   }
// }

function* handleAuthRefrestToken(): Generator<any> {
  try {
    const { refreshToken } = getToken();
    const response: any = yield call(requestAuthRefresh, refreshToken);
    if (response?.data?.result) {
      saveToken(response?.data?.result?.accessToken, refreshToken);
      yield call(handleAuthFetchMe);
    }
  } catch (error: any) {
    logOut();
    message.error(error?.response?.data?.message);
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
    yield put(authUpdateMessageRedux({ messageAuth: "" }));
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
  handleAuthLoginWithEmailPassword,
};
