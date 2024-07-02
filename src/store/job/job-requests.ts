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
  title: string = "",
  postStatus: string = "",
  duration: string = "",
  page: string = "1",
  size: string = "10",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/posts?companyId=${company_id}&${
      title ? `title=${title}&` : ""
    }${postStatus ? `postStatus=${postStatus}&` : ""}${
      duration ? `duration=${duration}&` : ""
    }page=${page}&size=${size}`,
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
export const requestJobUpdateJob = (
  job_id: string,
  dataUpdateJob: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.put(`${API}/api/v1/employees/posts/${job_id}`, dataUpdateJob, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestJobUpdateJobStatus = (
  job_id: string,
  job_status: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.put(
    `${API}/api/v1/employees/posts/${job_id}/status?postStatus=${job_status}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
