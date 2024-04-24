import {
  UploadOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

export const dataSideBar = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/manage/dashboard",
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: "Thông tin cá nhân",
    path: "/manage/update",
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Đăng tin",
    path: "/manage/update",
  },
];
