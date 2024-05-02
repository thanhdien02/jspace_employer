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
export const requestEmployerPickCompanyInListThatForYourCompany = (
  dataUpdateEmployerForPick: any,
  employer_id: string,
  accessToken: string
) => {
  return axios.patch(
    `${API}/api/v1/employees/${employer_id}`,
    {
      ...dataUpdateEmployerForPick,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestEmployerConfirmCompanyInListThatForYourCompany = (
  company_id: string,
  accessToken: string
) => {
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
