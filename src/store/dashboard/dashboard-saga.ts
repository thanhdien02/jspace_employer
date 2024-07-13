import { takeLatest } from "redux-saga/effects";
import {
  dashboardGetDashboardNumberAll,
  dashboardGetDashboardPostMonth,
  dashboardGetDashboardPostYear,
  dashboardGetDashboardUserMonth,
  dashboardGetDashboardUserYear,
} from "./dashboard-slice";
import {
  handleDashboardGetDashboardNumberAll,
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
  yield takeLatest(
  
    dashboardGetDashboardNumberAll.type,
    handleDashboardGetDashboardNumberAll
  );
}
