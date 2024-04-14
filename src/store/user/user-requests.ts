import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestGetAllUser = (accessToken: string) => {
  return axios.get(`${API}/api/v1/admins/users?size=100`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
