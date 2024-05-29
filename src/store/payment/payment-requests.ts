import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestPatmentRequestPayment = (
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
