import { call, put } from "redux-saga/effects";
import { getToken, saveToken } from "../../utils/auth";
import {
  authUpdateFetchRedux,
  authUpdateLoadingRedux,
  authUpdateRolesRedux,
} from "./auth-slice";
import {
  requestAuthFetchMe,
  requestAuthGetAllRoles,
  requestAuthLogin,
} from "./auth-requests";
import { commonUpdateOAuthRedux } from "../common/common-slice";

function* handleAuthLogin(dataLogin: any): Generator<any> {
  try {
    const response: any = yield call(requestAuthLogin, dataLogin.payload);

    yield put(authUpdateLoadingRedux({ loading: true }));
    if (response?.data?.result?.accessToken === "") {
      const listRole: any = yield call(requestAuthGetAllRoles);

      yield put(authUpdateRolesRedux({ roles: listRole.data?.result }));
      yield put(
        commonUpdateOAuthRedux({ infoUserOauth: { ...dataLogin.payload } })
      );
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
    if (response?.data?.result) {
      yield put(
        authUpdateFetchRedux({
          accessToken: accessToken,
          user: response.data.result,
        })
      );
    }
  } catch (error) {
  } finally {
  }
}
export { handleAuthLogin, handleAuthFetchMe };
