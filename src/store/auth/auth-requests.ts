import axios from "axios";
import { API } from "../../configs/configAPI";
export const requestAuthRegister = (dataRole: string, dataRegister: any) => {
  return axios.post(`${API}/api/v1/auth/users/register?role=${dataRole}`, {
    ...dataRegister,
  });
};
export const requestAuthRegisterV2 = (dataRegister: any) => {
  return axios.post(
    `${API}/api/v1/auth/users/register-v2`,
    {
      ...dataRegister,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const requestAuthGetAllRoles = () => {
  return axios.get(`${API}/api/v1/auth/roles`);
};

export const requestAuthLogin = (dataLogin: any) => {
  return axios.post(`${API}/api/v1/auth/users/login`, {
    ...dataLogin,
  });
};
export const requestAuthLoginWithEmailAndPassword = (dataLogin: any) => {
  return axios.post(`${API}/api/v1/auth/users/login-v2`, {
    ...dataLogin,
  });
};

export const requestAuthFetchMe = (accessToken: string) => {
  if (!accessToken) return;
  return axios.get(`${API}/api/v1/auth/employee/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
export const requestAuthRefresh = (refreshToken: string) => {
  if (!refreshToken) return;
  return axios.post(`${API}/api/v1/auth/user-refresh-token`, null, {
    headers: {
      refreshToken: refreshToken,
    },
  });
};
