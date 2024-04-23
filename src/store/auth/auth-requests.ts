import axios from "axios";
import { API } from "../../configs/configAPI";
export const requestAuthRegister = (dataRole: string, dataRegister: any) => {
  return axios.post(`${API}/api/v1/auth/users/register?role=${dataRole}`, {
    ...dataRegister,
  });
};

export const requestAuthGetAllRoles = () => {
  return axios.get(`${API}/api/v1/auth/roles`);
};

export const requestAuthLogin = (dataLogin: any) => {
  return axios.post(`${API}/api/v1/auth/users/login`, {
    ...dataLogin,
  });
};

export const requestAuthFetchMe = (accessToken: string) => {
  if (!accessToken) return;
  return axios.get(`${API}/api/v1/auth/user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestAuthRefresh = (refreshToken: string) => {
  if (!refreshToken) return;
  return axios.get(`${API}/api/v1/auth/user-refresh-token`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${refreshToken}`,
    },
  });
};
