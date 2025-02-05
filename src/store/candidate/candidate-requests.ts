import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestCandidateGetAppliedCandidate = (
  job_id: any,
  candidateName: string = "",
  candidateEmail: string = "",
  applyStatus: string = "",
  page: string,
  size: string,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/posts/${job_id}/applied-candidates?candidateName=${candidateName}&candidateEmail=${candidateEmail}&applyStatus=${applyStatus}&page=${page}&size=${size}`,
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
export const requestCandidateGetCandidateFollowedCompany = (
  companyId: string = "",
  name: string = "",
  email: string = "",
  phone: string = "",
  page: string = "1",
  size: string = "9",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/companies/${companyId}/candidates/followed?name=${name}&email=${email}&phoneNumber=${phone}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCandidateGetFindCandidate = (
  gender: string = "",
  location: string = "",
  rank: string = "",
  experience: string = "",
  page: string = "1",
  size: string = "9",
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/employees/candidates?${gender ? `gender=${gender}&` : ""}${
      location ? `location=${location}&` : ""
    }${rank ? `rank=${rank}&` : ""}${
      experience ? `experience=${experience}&` : ""
    }page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCandidateSendMailToCompanyConfirmAgain = (
  companyId: any,
  employerId: any,
  accessToken: string
) => {
  return axios.post(
    `${API}/api/v1/employees/${employerId}/companies/${companyId}/request-verify-info`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestCandidateGetInformation = (
  candidate_id: string,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(
    `${API}/api/v1/candidates/${candidate_id}/profiles/details`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
