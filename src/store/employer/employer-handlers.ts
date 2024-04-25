import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { employerUpdateLoadingRedux } from "./employer-slice";
import { requestEmployerUpdateInformation } from "./employer-requests";
import { message } from "antd";
import { handleAuthFetchMe } from "../auth/auth-handlers";

function* handleEmployerUpdateInformation(
  dataUpdateEmployer: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestEmployerUpdateInformation,
      dataUpdateEmployer?.payload,
      dataUpdateEmployer?.payload?.id,
      token?.accessToken
    );
    console.log(response?.data?.code);
    if (response?.data?.code === 1000) {
      message.success("Cập nhật thông tin tài khoản thành công.");
      yield call(handleAuthFetchMe);
      // yield put(employerUpdateMessageRedux({ messageAdmin: "success" }));
    } else {
      message.error("Cập nhật thông tin tài khoản thất bại.");
      // yield put(employerUpdateMessageRedux({ messageAdmin: "fail" }));
    }
  } catch (error) {
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
export { handleEmployerUpdateInformation };
