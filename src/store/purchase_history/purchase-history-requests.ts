import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestPurchaseHistotyGetPurchaseHistoty = (
  page: string = "1",
  size: string = "10",
  company_id: string = "",
  productName: string = "",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/purchase-history?productName=${productName}&companyId=${company_id}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestPurchaseHistotyGetExportAllPurchaseHistoty = (
  page: string = "1",
  size: string = "1000",
  company_id: string = "",
  productName: string = "",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/purchase-history?productName=${productName}&companyId=${company_id}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
