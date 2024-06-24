import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";

import { message } from "antd";
import {
  notificationUpdateLoadingRedux,
  notificationUpdateNotificationRedux,
  notificationUpdatePaginationRedux,
} from "./notification-slice";
import {
  requestNotificationGetNotification,
  requestNotificationUpdateReadNotification,
} from "./notification-requests";

function* handleNotificationGetNotification(
  dataGetNotification: any
): Generator<any> {
  try {
    yield put(
      notificationUpdateLoadingRedux({
        loadingNotification: true,
      })
    );
    const token: Token = getToken();
    const response: any = yield call(
      requestNotificationGetNotification,
      dataGetNotification?.payload?.userId,
      dataGetNotification?.payload?.page,
      dataGetNotification?.payload?.size,
      token?.accessToken
    );
    if (response.data.code === 1000) {
      yield put(
        notificationUpdateNotificationRedux({
          notifications: response.data.result.content,
        })
      );
      yield put(
        notificationUpdatePaginationRedux({
          paginationNotification: {
            pageNumber: response.data.result.pageNumber,
            pageSize: response.data.result.pageSize,
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            numberOfElements: response.data.result.numberOfElements,
          },
        })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(
      notificationUpdateLoadingRedux({
        loadingNotification: false,
      })
    );
  }
}
function* handleNotificationUpdateReadNotification(
  dataUpdateNotification: any
): Generator<any> {
  try {
    yield put(
      notificationUpdateLoadingRedux({
        loadingNotification: true,
      })
    );
    const token: Token = getToken();
    const response: any = yield call(
      requestNotificationUpdateReadNotification,
      dataUpdateNotification?.payload?.userId,
      dataUpdateNotification?.payload?.notificationId,
      dataUpdateNotification?.payload?.readStatus,
      token?.accessToken
    );
    if (response.data.code === 1000) {
      yield call(handleNotificationGetNotification, {
        payload: {
          userId: dataUpdateNotification?.payload?.userId,
          page: 1,
          size: 10,
        },
      });
      message.success("Cập nhật thành công");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(
      notificationUpdateLoadingRedux({
        loadingNotification: false,
      })
    );
  }
}
export {
  handleNotificationGetNotification,
  handleNotificationUpdateReadNotification,
};
