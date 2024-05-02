import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestCompanyUpdateInformation = (
  dataUpdateCompany: any,
  company_id: string,
  accessToken: string
) => {
  return axios.patch(
    `${API}/api/v1/companys/${company_id}`,
    {
      ...dataUpdateCompany,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCompanyCreateCompany = (
  dataCompanyCreate: any,
  accessToken: string
) => {
  return axios.post(
    `${API}/api/v1/employees/companies`,
    {
      ...dataCompanyCreate,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCompanyGetCompany = (
  companyname: string = "",
  accessToken?: string,
  page: string = "1",
  size: string = "10"
) => {
  return axios.get(
    `${API}/api/v1/employees/companies?page=${page}&size=${size}&name=${companyname}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCompanyGetCompanyById = (
  companyId: string,
  accessToken: string
) => {
  return axios.get(`${API}/api/v1/companies/${companyId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
