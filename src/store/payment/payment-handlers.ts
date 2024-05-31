import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { message } from "antd";
import {
  paymentUpdateLoadingRedux,
  paymentUpdatePaymentRedux,
} from "./payment-slice";
import { requestPatmentRequestPayment } from "./payment-requests";

function* handlePaymentRequestPayment(dataRequestPayment: any): Generator<any> {
  try {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestPatmentRequestPayment,
      {
        ...dataRequestPayment?.payload,
        intent: "sale",
        paymentMethod: "paypal",
        currency: "USD",
        cancelUrl: "https://jspace-employer.vercel.app/manage/products-buyed",
        successUrl: "https://jspace-employer.vercel.app/manage/products-buyed",
      },
      token?.accessToken
    );
    if (response?.data) {
      yield put(paymentUpdatePaymentRedux({ payment: response?.data }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: false }));
  }
}
export { handlePaymentRequestPayment };
