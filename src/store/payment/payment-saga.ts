import { takeLatest } from "redux-saga/effects";
import { paymentRequestPayment } from "./payment-slice";
import { handlePaymentRequestPayment } from "./payment-handlers";

export default function* authSaga() {
  yield takeLatest(paymentRequestPayment.type, handlePaymentRequestPayment);
}
