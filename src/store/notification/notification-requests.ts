import axios from "axios";
import { API } from "../../configs/configAPI";

export const requestNotificationGetNotification = (
  userId: string = "1",
  page: string = "1",
  size: string = "10",
  accessToken: string
) => {
  return axios.get(
    `${API}/api/v1/users/notifications?userId=${userId}&page=${page}&size=${size}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
export const requestNotificationUpdateReadNotification = (
  userId: string = "1",
  notificationId: string = "1",
  readStatus: boolean,
  accessToken: string
) => {
  return axios.put(
    `${API}/api/v1/users/notifications/update/read-status?userId=${userId}&notificationId=${notificationId}&readStatus=${readStatus}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
