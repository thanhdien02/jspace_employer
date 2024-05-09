import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestJobGetById = (job_id: any, accessToken: string) => {
  if (!accessToken) return;
  return axios.get(`${API}/api/v1/candidates/${job_id}/resumes?size=100`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
