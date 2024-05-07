import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestEmployerUpdateInformation = (
  dataUpdateEmployer: any,
  employer_id: string,
  accessToken: string
) => {
  return axios.patch(
    `${API}/api/v1/employees/${employer_id}`,
    {
      ...dataUpdateEmployer,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestEmployerUpdateBackground = (
  dataEmployerUpdateBackground: any,
  employer_id: string = "",
  accessToken: string
) => {
  if (accessToken === undefined || employer_id == "") return;
  return axios.put(
    `${API}/api/v1/employees/${employer_id}/update-background`,
    dataEmployerUpdateBackground,
    {
      headers: {
        "Content-Type": "multipart/form-datas",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestEmployerConfirmCompanyInListThatForYourCompany = (
  company_id: string,
  accessToken: string
) => {
  if (company_id === undefined) return;
  return axios.put(
    `${API}/api/v1/employees/pick-company?companyId=${company_id}`,
    null,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
