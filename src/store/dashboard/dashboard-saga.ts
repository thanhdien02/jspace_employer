import { takeLatest } from "redux-saga/effects";
import {
  dashboardGetDashboardPostMonth,
  dashboardGetDashboardPostYear,
  dashboardGetDashboardUserMonth,
  dashboardGetDashboardUserYear,
} from "./dashboard-slice";
import {
  handleDashboardGetDashboardPostMonth,
  handleDashboardGetDashboardPostYear,
  handleDashboardGetDashboardUserMonth,
  handleDashboardGetDashboardUserYear,
} from "./dashboard-handlers";

export default function* dashboardSaga() {
  yield takeLatest(
    dashboardGetDashboardUserMonth.type,
    handleDashboardGetDashboardUserMonth
  );
  yield takeLatest(
    dashboardGetDashboardUserYear.type,
    handleDashboardGetDashboardUserYear
  );
  yield takeLatest(
    dashboardGetDashboardPostMonth.type,
    handleDashboardGetDashboardPostMonth
  );
  yield takeLatest(
    dashboardGetDashboardPostYear.type,
    handleDashboardGetDashboardPostYear
  );
}
