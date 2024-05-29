import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { message } from "antd";
import {
  paymentUpdateLoadingRedux,
  paymentUpdatePaymentRedux,
} from "./payment-slice";
import { requestPatmentRequestPayment } from "./payment-requests";

function* handlePaymentRequestPayment(dataRequestPayment: any): Generator<any> {
  console.log(
    "🚀 ~ function*handlePaymentRequestPayment ~ dataRequestPayment:",
    dataRequestPayment
  );
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
        cancelUrl: "https://jspace-fe.vercel.app",
        successUrl: "https://jspace-employer.vercel.app/manage/products-buyed",
      },
      token?.accessToken
    );

    if (response?.data) {
      console.log(
        "🚀 ~ function*handlePaymentRequestPayment ~ response?.data:",
        response?.data
      );
      message.success(" thành công.");
      yield put(paymentUpdatePaymentRedux({ payment: response?.data }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: false }));
  }
}
export { handlePaymentRequestPayment };
