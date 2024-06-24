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
export const requestEmployerUpdateStatusAppliedCandidate = (
  postId?: string,
  candidateId?: string,
  applyStatus?: string,
  notification?: string,
  accessToken?: string
) => {
  if (!accessToken) return;
  return axios.put(
    `${API}/api/v1/employees/posts/update-apply-status`,
    { postId, candidateId, applyStatus, notification },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
