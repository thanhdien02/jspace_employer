import {
  UploadOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import IconBuilding from "../components/icons/IconBuilding";

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
    path: "/manage/update-information-account",
  },
  {
    key: "3",
    icon: <IconBuilding></IconBuilding>,
    label: "Thông tin công ty",
    path: "/manage/update-information-company",
  },
  {
    key: "4",
    icon: <UploadOutlined />,
    label: "Đăng tin",
    path: "/manage/check-work-required",
  },
];
export const dataPosition = [
  { value: "truongphong", label: "Trưởng phòng" },
  { value: "nhanvien", label: "Nhân viên" },
  { value: "giamdoc", label: "Giám đốc" },
  { value: "photruongphong", label: "Phó trường phòng" },
  { value: "truongnhom", label: "Trưởng nhóm" },
];
