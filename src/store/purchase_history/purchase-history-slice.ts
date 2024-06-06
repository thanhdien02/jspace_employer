import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  purchasehistorys: any;
  purchasehistoryById: any;
  paginationPurchaseHistory?: any;
  loadingPurchaseHistory?: boolean;
  messagePurchaseHistory?: string;
}

const init: IUser = {
  purchasehistorys: [],
  purchasehistoryById: [],
  paginationPurchaseHistory: {},
  loadingPurchaseHistory: false,
  messagePurchaseHistory: "",
};

const purchasehistorySlice: any = createSlice({
  name: "purchasehistory",
  initialState: init,
  reducers: {
    purchasehistoryGetPurchaseHistory: () => {},
    purchasehistoryGetPurchaseHistoryById: () => {},
    purchasehistoryUpdatePurchaseHistoryRedux: (state: any, action: any) => ({
      ...state,
      purchasehistorys: action.payload.purchasehistorys,
    }),
    purchasehistoryUpdatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationPurchaseHistory: action.payload.paginationPurchaseHistory,
    }),
    purchasehistoryUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingPurchaseHistory: action.payload.loadingPurchaseHistory,
    }),
    purchasehistoryUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messagePurchaseHistory: action.payload.messagePurchaseHistory,
    }),
    purchasehistoryUpdateProductByIdRedux: (state: any, action: any) => ({
      ...state,
      productById: action.payload.productById,
    }),
  },
});
export const {
  purchasehistoryGetPurchaseHistory,
  purchasehistoryGetPurchaseHistoryById,
  purchasehistoryUpdatePurchaseHistoryRedux,
  purchasehistoryUpdatePaginationRedux,
  purchasehistoryUpdateLoadingRedux,
  purchasehistoryUpdateMessageRedux,
  purchasehistoryUpdateProductByIdRedux,
} = purchasehistorySlice.actions;
export default purchasehistorySlice.reducer;
