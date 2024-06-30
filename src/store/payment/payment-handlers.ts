import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { message } from "antd";
import {
  paymentUpdateLoadingRedux,
  paymentUpdateMessageRedux,
  paymentUpdatePaymentRedux,
} from "./payment-slice";
import {
  requestPaymentRequestConfirmPayment,
  requestPaymentRequestPayment,
  requestPaymentRequestPaymentCart,
} from "./payment-requests";

function* handlePaymentRequestPayment(dataRequestPayment: any): Generator<any> {
  try {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestPaymentRequestPayment,
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
function* handlePaymentRequestPaymentCart(
  dataRequestPaymentCart: any
): Generator<any> {
  try {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: true }));
    const token: Token = getToken();
    const response: any = yield call(
      requestPaymentRequestPaymentCart,
      {
        ...dataRequestPaymentCart?.payload,
        intent: "sale",
        paymentMethod: "paypal",
        currency: "USD",
        cancelUrl: "http://localhost:5173/manage/products-buyed",
        successUrl: "http://localhost:5173/manage/products-buyed",
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
function* handlePaymentRequestConfirmPayment(
  dataRequestConfirmPayment: any
): Generator<any> {
  try {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: true }));
    const response: any = yield call(
      requestPaymentRequestConfirmPayment,
      dataRequestConfirmPayment?.payload?.mac,
      dataRequestConfirmPayment?.payload?.paymentId,
      dataRequestConfirmPayment?.payload?.PayerID
    );
    if (response?.data) {
      yield put(
        paymentUpdateMessageRedux({ messagePayment: "paymentsuccess" })
      );
      message.success("Bạn đã mua dịch vụ thành công !");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(paymentUpdateLoadingRedux({ loadingPayment: false }));
  }
}

export {
  handlePaymentRequestPayment,
  handlePaymentRequestPaymentCart,
  handlePaymentRequestConfirmPayment,
};
