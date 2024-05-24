import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestCommonGetLocation = () => {
  return axios.get(`${API}/api/v1/commons/locations`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetJobType = () => {
  return axios.get(`${API}/api/v1/commons/jobTypes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetGender = () => {
  return axios.get(`${API}/api/v1/commons/genders`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetApplyStatus = () => {
  return axios.get(`${API}/api/v1/commons/applyStatus`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetApplyRank = () => {
  return axios.get(`${API}/api/v1/commons/ranks`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetExperience = () => {
  return axios.get(`${API}/api/v1/commons/experiences`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
export const requestCommonGetSkills = () => {
  return axios.get(`${API}/api/v1/skills`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
