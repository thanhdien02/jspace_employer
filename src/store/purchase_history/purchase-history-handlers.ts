import { call, put } from "redux-saga/effects";
import { getToken } from "../../utils/auth";

import { message } from "antd";
import {
  purchasehistoryUpdateLoadingRedux,
  purchasehistoryUpdateMessageRedux,
  purchasehistoryUpdatePaginationRedux,
  purchasehistoryUpdatePurchaseHistoryRedux,
} from "./purchase-history-slice";
import { requestPurchaseHistotyGetPurchaseHistoty } from "./purchase-history-requests";
import { commonUpdateExportDataRedux } from "../common/common-slice";

function* handlePurchaseHistoryGetPurchaseHistory(
  dataGetPurchaseHistory: any
): Generator<any> {
  try {
    yield put(
      purchasehistoryUpdateLoadingRedux({
        loadingPurchaseHistory: true,
      })
    );
    const { accessToken } = getToken();
    const response: any = yield call(
      requestPurchaseHistotyGetPurchaseHistoty,
      dataGetPurchaseHistory?.payload?.page,
      dataGetPurchaseHistory?.payload?.size,
      dataGetPurchaseHistory?.payload?.company_id,
      dataGetPurchaseHistory?.payload?.productName,
      accessToken
    );
    if (response.data.code === 1000) {
      yield put(
        purchasehistoryUpdatePurchaseHistoryRedux({
          purchasehistorys: response.data.result.content,
        })
      );
      yield put(
        purchasehistoryUpdatePaginationRedux({
          paginationPurchaseHistory: {
            pageNumber: response.data.result.pageNumber,
            pageSize: response.data.result.pageSize,
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            numberOfElements: response.data.result.numberOfElements,
          },
        })
      );
      // message.success("Thành công");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(
      purchasehistoryUpdateLoadingRedux({
        loadingPurchaseHistory: false,
      })
    );
  }
}
function* handlePurchaseHistoryGetExportAllPurchaseHistory(
  dataGetPurchaseHistory: any
): Generator<any> {
  try {
    const { accessToken } = getToken();
    const response: any = yield call(
      requestPurchaseHistotyGetPurchaseHistoty,
      dataGetPurchaseHistory?.payload?.page,
      dataGetPurchaseHistory?.payload?.size,
      dataGetPurchaseHistory?.payload?.company_id,
      dataGetPurchaseHistory?.payload?.productName,
      accessToken
    );
    if (response.data.code === 1000) {
      yield put(
        commonUpdateExportDataRedux({
          exportData: response.data.result.content,
        })
      );
      yield put(
        purchasehistoryUpdateMessageRedux({
          messagePurchaseHistory: "export",
        })
      );
      message.success("Thành công");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  }
}
export {
  handlePurchaseHistoryGetPurchaseHistory,
  handlePurchaseHistoryGetExportAllPurchaseHistory,
};
