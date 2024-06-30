import { takeLatest } from "redux-saga/effects";
import {
  paymentRequestConfirmPayment,
  paymentRequestPayment,
  paymentRequestPaymentCart,
} from "./payment-slice";
import {
  handlePaymentRequestConfirmPayment,
  handlePaymentRequestPayment,
  handlePaymentRequestPaymentCart,
} from "./payment-handlers";

export default function* authSaga() {
  yield takeLatest(paymentRequestPayment.type, handlePaymentRequestPayment);
  yield takeLatest(
    paymentRequestPaymentCart.type,
    handlePaymentRequestPaymentCart
  );
  yield takeLatest(
    paymentRequestConfirmPayment.type,
    handlePaymentRequestConfirmPayment
  );
}
