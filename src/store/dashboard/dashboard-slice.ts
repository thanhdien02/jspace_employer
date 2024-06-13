import { createSlice } from "@reduxjs/toolkit";

interface IDashboard {
  dashboardUser: any;
  dashboardUserYear: any;
  dashboardCompany: any;
  dashboardPostMonth: any;
  dashboardPostYear: any;
  loadingDashboard?: boolean;
  messageDashboerd?: string;
  paginationDashboard?: any;
}

const init: IDashboard = {
  dashboardUser: {},
  dashboardUserYear: {},
  dashboardPostMonth: {},
  dashboardPostYear: {},
  dashboardCompany: {},
  loadingDashboard: false,
  messageDashboerd: "",
  paginationDashboard: {},
};
const dashboardSlice: any = createSlice({
  name: "dashboard",
  initialState: init,
  reducers: {
    dashboardGetDashboardUserMonth: () => {},
    dashboardGetDashboardUserYear: () => {},
    dashboardGetDashboardPostMonth: () => {},
    dashboardGetDashboardPostYear: () => {},
    dashboardUpdateDashboardUserMonthRedux: (state, action) => ({
      ...state,
      dashboardUserMonth: action.payload.dashboardUserMonth,
    }),
    dashboardUpdateDashboardUserYearRedux: (state, action) => ({
      ...state,
      dashboardUserYear: action.payload.dashboardUserYear,
    }),
    dashboardUpdateDashboardPostMonthRedux: (state, action) => ({
      ...state,
      dashboardPostMonth: action.payload.dashboardPostMonth,
    }),
    dashboardUpdateDashboardPostYearRedux: (state, action) => ({
      ...state,
      dashboardPostYear: action.payload.dashboardPostYear,
    }),
    dashboardUpdateLoadingRedux: (state, action) => ({
      ...state,
      loadingDashboard: action.payload.loadingDashboard,
    }),
    dashboardUpdatePaginationRedux: (state, action) => ({
      ...state,
      paginationDashboard: action.payload.paginationDashboard,
    }),
    dashboardUpdateMessageRedux: (state, action) => ({
      ...state,
      messageDashboard: action.payload.messageDashboard,
    }),
  },
});
export const {
  dashboardUpdateLoadingRedux,
  dashboardUpdatePaginationRedux,
  dashboardUpdateMessageRedux,
  dashboardGetDashboardUserMonth,
  dashboardGetDashboardUserYear,
  dashboardUpdateDashboardUserYearRedux,
  dashboardGetDashboardPostYear,
  dashboardGetDashboardPostMonth,
  dashboardUpdateDashboardUserMonthRedux,
  dashboardUpdateDashboardPostMonthRedux,
  dashboardUpdateDashboardPostYearRedux
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
