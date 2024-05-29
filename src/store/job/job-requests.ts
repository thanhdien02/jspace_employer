import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestJobPostJob = (dataPost: any, accessToken: string) => {
  if (!accessToken) return;
  return axios.post(`${API}/api/v1/employees/posts`, dataPost, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestJobGetPostedJob = (
  company_id: string,
  page: string = "1",
  size: string = "10",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/posts?companyId=${company_id}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestJobGetJobById = (job_id: string, accessToken: string) => {
  if (!accessToken) return;
  return axios.get(`${API}/api/v1/posts/${job_id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
