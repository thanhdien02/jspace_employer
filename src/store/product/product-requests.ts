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
