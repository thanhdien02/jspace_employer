import { takeLatest } from "redux-saga/effects";
import { paymentRequestPayment, paymentRequestPaymentCart } from "./payment-slice";
import { handlePaymentRequestPayment, handlePaymentRequestPaymentCart } from "./payment-handlers";

export default function* authSaga() {
  yield takeLatest(paymentRequestPayment.type, handlePaymentRequestPayment);
  yield takeLatest(paymentRequestPaymentCart.type, handlePaymentRequestPaymentCart);
}
