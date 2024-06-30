import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestProductGetProduct = (
  page: string = "1",
  size: string = "10"
) => {
  return axios.get(`${API}/api/v1/products?page=${page}&size=${size}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestProductGetBuyedProduct = (
  company_id: string = "1",
  durationFilter: string = "unexpired",
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/employees/purchased-products?companyId=${company_id}&durationFilter=${durationFilter}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestProductGetProductById = (product_id: string) => {
  return axios.get(`${API}/api/v1/products/${product_id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestProductGetBuyedProductById = (
  product_id: string,
  company_id: string,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/purchased-products/${product_id}?companyId=${company_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestProductCreateProduct = (
  dataCreateProduct: any,
  accessToken: string
) => {
  return axios.post(
    `${API}/api/v1/admins/products`,
    { ...dataCreateProduct },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
