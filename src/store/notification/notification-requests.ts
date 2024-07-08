import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestNotificationGetNotification = (
  companyId: string = "1",
  page: string = "1",
  size: string = "10",
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/company-notifications?company_id=${companyId}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestNotificationUpdateReadNotification = (
  notificationId: string = "1",
  read: boolean,
  accessToken: string
) => {
  return axios.put(
    `${API}/api/v1/company-notifications/${notificationId}?read=${read}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
