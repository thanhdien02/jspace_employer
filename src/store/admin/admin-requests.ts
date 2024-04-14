import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestAdminCreateSubAdmin = (
  dataCreateSubAdmin: any,
  accessToken: string
) => {
  console.log("🚀 ~ accessToken:", accessToken)
  console.log("🚀 ~ dataCreateSubAdmin:", dataCreateSubAdmin)
  return axios.post(
    `${API}/api/v1/admins`,
    {
      ...dataCreateSubAdmin,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
