import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import {
  employerUpdateLoadingRedux,
  employerUpdateMessageRedux,
} from "./employer-slice";
import {
  requestEmployerConfirmCompanyInListThatForYourCompany,
  requestEmployerDeleteAvatar,
  requestEmployerDeleteBackground,
  requestEmployerUpdateAvatar,
  requestEmployerUpdateBackground,
  requestEmployerUpdateInformation,
} from "./employer-requests";
import { message } from "antd";
import { handleAuthFetchMe } from "../auth/auth-handlers";
import { companyUpdateMessageRedux } from "../company/company-slice";

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
      yield put(
        employerUpdateMessageRedux({ messageEmployer: "updatesuccess" })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
function* handleEmployerConfirmInformationCompany(
  dataConfirmCompany: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestEmployerConfirmCompanyInListThatForYourCompany,
      dataConfirmCompany?.payload?.company_id,
      token?.accessToken
    );
    console.log(response?.data?.code);
    if (response?.data?.code === 1000) {
      message.success("Cập nhật thông tin tài khoản thành công.");
      yield call(handleAuthFetchMe);
      yield put(
        companyUpdateMessageRedux({ messageCompany: "createcompanysuccess" })
      );
    } else {
      message.error("Cập nhật thông tin tài khoản thất bại.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
function* handleEmployerUpdateBackgroundEmployer(
  dataBackgroundEmployer: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();
    const formData = new FormData();
    formData.append(
      "file",
      dataBackgroundEmployer?.payload?.file?.originFileObj
    );
    const response: any = yield call(
      requestEmployerUpdateBackground,
      formData,
      dataBackgroundEmployer?.payload?.employer_id,
      token?.accessToken
    );
    console.log("response: " + response);
    if (response?.data?.code === 1000) {
      message.success("Cập nhật background thành công.");
      yield call(handleAuthFetchMe);
    } else {
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
function* handleEmployerUpdateAvatarEmployer(
  dataUpdateAvatarEmployer: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();
    const formData = new FormData();
    formData.append(
      "file",
      dataUpdateAvatarEmployer?.payload?.file?.originFileObj
    );
    const response: any = yield call(
      requestEmployerUpdateAvatar,
      formData,
      dataUpdateAvatarEmployer?.payload?.employer_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      message.success("Cập nhật avatar thành công.");
      yield call(handleAuthFetchMe);
    } else {
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
function* handleEmployerDeleteAvatarEmployer(
  dataUpdateAvatarEmployer: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();
    const response: any = yield call(
      requestEmployerDeleteAvatar,
      dataUpdateAvatarEmployer?.payload?.avatar_id,
      dataUpdateAvatarEmployer?.payload?.employer_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      message.success("Xóa avatar thành công.");
      yield call(handleAuthFetchMe);
    } else {
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
function* handleEmployerDeleteBackgroundEmployer(
  dataUpdateBackgroundEmployer: any
): Generator<any> {
  try {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: true }));
    const token: Token = getToken();
    const response: any = yield call(
      requestEmployerDeleteBackground,
      dataUpdateBackgroundEmployer?.payload?.background_id,
      dataUpdateBackgroundEmployer?.payload?.employer_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      message.success("Xóa background thành công.");
      yield call(handleAuthFetchMe);
    } else {
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(employerUpdateLoadingRedux({ loadingEmployer: false }));
  }
}
export {
  handleEmployerUpdateInformation,
  handleEmployerConfirmInformationCompany,
  handleEmployerUpdateBackgroundEmployer,
  handleEmployerUpdateAvatarEmployer,
  handleEmployerDeleteAvatarEmployer,
  handleEmployerDeleteBackgroundEmployer,
};
