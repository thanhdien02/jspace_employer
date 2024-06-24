import { takeLatest } from "redux-saga/effects";
import {
  notificationGetNotification,
  notificationUpdateReadNotification,
} from "./notification-slice";
import {
  handleNotificationGetNotification,
  handleNotificationUpdateReadNotification,
} from "./notification-handlers";

export default function* notificationSaga() {
  yield takeLatest(
    notificationGetNotification.type,
    handleNotificationGetNotification
  );
  yield takeLatest(
    notificationUpdateReadNotification.type,
    handleNotificationUpdateReadNotification
  );
}
