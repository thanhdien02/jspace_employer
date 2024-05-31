import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestCartAddToCart = (
  dataAddToCart: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.post(`${API}/api/v1/employees/carts`, dataAddToCart, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestCartUpdateCart = (
  cart_id: string,
  quantity: string,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.put(
    `${API}/api/v1/employees/carts?cartId=${cart_id}&quantity=${quantity}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCartGetCart = (
  company_id: string,
  page: string = "1",
  size: string = "10",
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/employees/carts?companyId=${company_id}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCartDeleteCart = (cart_id: string, accessToken: string) => {
  return axios.delete(`${API}/api/v1/employees/carts?cartId=${cart_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
