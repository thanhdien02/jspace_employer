import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { message } from "antd";
import { handleAuthFetchMe } from "../auth/auth-handlers";
import {
  companyUpdateCompanyRedux,
  companyUpdateLoadingRedux,
  companyUpdatePaginationRedux,
} from "./company-slice";
import {
  requestCompanyCreateCompany,
  requestCompanyGetCompany,
  requestCompanyGetCompanyById,
  requestCompanyUpdateInformation,
} from "./company-requests";

function* handleCompanyUpdateInformation(
  dataUpdateCompany: any
): Generator<any> {
  try {
    yield put(companyUpdateLoadingRedux({ loadingCompany: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCompanyUpdateInformation,
      dataUpdateCompany?.payload,
      dataUpdateCompany?.payload?.id,
      token?.accessToken
    );
    console.log(response?.data?.code);
    if (response?.data?.code === 1000) {
      message.success("Cập nhật thông tin tài khoản thành công.");
      yield call(handleAuthFetchMe);
    } else {
      message.error("Cập nhật thông tin tài khoản thất bại.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(companyUpdateLoadingRedux({ loadingCompany: false }));
  }
}
function* handleCompanyCreateCompany(dataCompanyCreate: any): Generator<any> {
  try {
    yield put(companyUpdateLoadingRedux({ loadingCompany: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCompanyCreateCompany,
      dataCompanyCreate?.payload,
      token?.accessToken
    );
    console.log(response);
    if (response?.data?.code === 1000) {
      message.success("Tạo công ty thành công.");
      yield call(handleAuthFetchMe);
    } else {
      message.error("Tạo công ty thất bại.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(companyUpdateLoadingRedux({ loadingCompany: false }));
  }
}

function* handleCompanyGetCompany(dataGetCompany: any): Generator<any> {
  try {
    yield put(companyUpdateLoadingRedux({ loadingCompany: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCompanyGetCompany,
      dataGetCompany?.payload?.companyname,
      token?.accessToken,
      dataGetCompany?.payload?.page
    );
    if (response?.data?.code === 1000) {
      // message.success("Load dữ liệu công ty thành công.");
      yield put(
        companyUpdateCompanyRedux({ company: response?.data?.result?.content })
      );
      yield put(
        companyUpdatePaginationRedux({
          paginationCompany: {
            pageNumber: response?.data?.result?.pageNumber,
            pageSize: response?.data?.result?.pageSize,
            totalElements: response?.data?.result?.totalElements,
            totalPages: response?.data?.result?.totalPages,
            numberOfElements: response?.data?.result?.numberOfElements,
          },
        })
      );
    } else {
      message.error("Tạo công ty thất bại.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(companyUpdateLoadingRedux({ loadingCompany: false }));
  }
}
function* handleCompanyGetCompanyById(dataGetById: any): Generator<any> {
  try {
    yield put(companyUpdateLoadingRedux({ loadingCompany: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCompanyGetCompanyById,
      dataGetById?.payload?.companyId,
      token?.accessToken
    );
    console.log(response);
    if (response?.data?.code === 1000) {
      message.success("Load dữ liệu công ty thành công.");
      yield put(companyUpdateCompanyRedux({ company: response.data.result }));
    } else {
      message.error("Tạo công ty thất bại.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(companyUpdateLoadingRedux({ loadingCompany: false }));
  }
}
export {
  handleCompanyUpdateInformation,
  handleCompanyCreateCompany,
  handleCompanyGetCompany,
  handleCompanyGetCompanyById,
};
