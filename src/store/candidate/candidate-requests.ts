import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestCandidateGetAppliedCandidate = (
  job_id: any,
  page: string,
  size: string,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/posts/${job_id}/applied-candidates?page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
