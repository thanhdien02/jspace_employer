import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestPaymentRequestPayment = (
  dataPayment: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.post(`${API}/api/v1/payment/request-payment`, dataPayment, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestPaymentRequestPaymentCart = (
  dataPaymentCart: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.post(`${API}/api/v1/paypal/create-order`, dataPaymentCart, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestPaymentRequestConfirmPayment = (
  mac?: string,
  paymentId?: string,
  PayerID?: string
) => {
  return axios.get(
    `${API}/api/v1/payment/check-payment?mac=${mac}&paymentId=${paymentId}&PayerID=${PayerID}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
