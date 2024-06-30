import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  payment: any;
  loadingPayment?: boolean;
  messagePayment?: string;
}

const init: IFile = {
  payment: {},
  loadingPayment: false,
  messagePayment: "",
};
const paymentSlice: any = createSlice({
  name: "payment",
  initialState: init,
  reducers: {
    paymentRequestPayment: () => {},
    paymentRequestConfirmPayment: () => {},
    paymentRequestPaymentCart: () => {},
    paymentUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingPayment: action.payload.loadingPayment,
    }),
    paymentUpdatePaymentRedux: (state: any, action: any) => ({
      ...state,
      payment: action.payload.payment,
    }),
    paymentUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messagePayment: action.payload.messagePayment,
    }),
  },
});
export const {
  paymentUpdateLoadingRedux,
  paymentUpdateMessageRedux,
  paymentUpdatePaymentRedux,
  paymentRequestPayment,
  paymentRequestPaymentCart,
  paymentRequestConfirmPayment,
} = paymentSlice.actions;
export default paymentSlice.reducer;
