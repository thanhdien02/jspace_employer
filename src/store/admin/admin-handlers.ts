import { call, put } from "redux-saga/effects";
import { requestAdminCreateSubAdmin } from "./admin-requests";
import { getToken, Token } from "../../utils/auth";
import { adminUploadLoading, adminUploadMessageRedux } from "./admin-slice";

function* handleAdminCreateSubAdmin(dataCreateSubAdmin: any): Generator<any> {
  try {
    yield put(adminUploadLoading({ loading: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestAdminCreateSubAdmin,
      dataCreateSubAdmin.payload,
      token?.accessToken
    );
    console.log(response?.data?.code);
    if (response?.data?.code === 1000) {
      yield put(adminUploadMessageRedux({ messageAdmin: "success" }));
    }
    else 
    {
      yield put(adminUploadMessageRedux({ messageAdmin: "fail" }));

    }
  } catch (error) {
  } finally {
    yield put(adminUploadLoading({ loading: false }));
  }
}
export { handleAdminCreateSubAdmin };
