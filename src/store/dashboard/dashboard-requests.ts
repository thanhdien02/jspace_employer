import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestDashboardGetDashboardUserMonth = (
  year: string,
  month: string,
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/dashboards/admins/users/statistic-month?year=${year}&month=${month}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestDashboardGetDashboardUserYear = (
  year: string,
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/dashboards/admins/users/statistic-year?year=${year}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestDashboardGetDashboardPostMonth = (
  company_id: string,
  year: string,
  month: string,
  accessToken: string
) => {
  if (!company_id) return;
  return axios.get(
    `${API}/api/v1/dashboards/companies/posts/statistic-month?companyId=${company_id}&year=${year}&month=${month}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestDashboardGetDashboardPostYear = (
  company_id: string,
  year: string,
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/dashboards/companies/posts/statistic-year?year=${year}&companyId=${company_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestDashboardGetDashboardNumberAll = (
  companyId: string,
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/dashboards/companies/${companyId}/statistic`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
