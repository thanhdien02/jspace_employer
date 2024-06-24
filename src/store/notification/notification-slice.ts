import { createSlice } from "@reduxjs/toolkit";

interface INotification {
  notifications: any;
  notificationById: any;
  paginationNotification?: any;
  loadingNotification?: boolean;
  messageNotification?: string;
}

const init: INotification = {
  notifications: [],
  notificationById: [],
  paginationNotification: {},
  loadingNotification: false,
  messageNotification: "",
};

const notificationSlice: any = createSlice({
  name: "notification",
  initialState: init,
  reducers: {
    notificationGetNotification: () => {},
    notificationUpdateReadNotification: () => {},
    notificationUpdateNotificationRedux: (state: any, action: any) => ({
      ...state,
      notifications: action.payload.notifications,
    }),
    notificationUpdatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationNotification: action.payload.paginationNotification,
    }),
    notificationUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingNotification: action.payload.loadingNotification,
    }),
    notificationUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageNotification: action.payload.messageNotification,
    }),
  },
});
export const {
  notificationUpdatePaginationRedux,
  notificationUpdateLoadingRedux,
  notificationUpdateMessageRedux,
  notificationGetNotification,
  notificationUpdateNotificationRedux,
  notificationUpdateReadNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
