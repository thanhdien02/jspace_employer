import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestFileUploadFile = (
  candidate_id: any,
  accessToken: string,
  dataUploadFile: any
) => {
  if (!accessToken) return;
  return axios.post(
    `${API}/api/v1/candidates/${candidate_id}/create-resume`,
    dataUploadFile,
    {
      headers: {
        "Content-Type": "multipart/form-datas",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestFileGetAllFile = (
  candidate_id: any,
  accessToken: string
) => {
  if (!accessToken) return;
  return axios.get(`${API}/api/v1/candidates/${candidate_id}/resumes?size=100`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
