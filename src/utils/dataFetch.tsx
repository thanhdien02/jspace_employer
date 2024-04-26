import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  DashboardOutlined,
  SwapOutlined,
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
    icon: <UserOutlined />,
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
  {
    key: "5",
    icon: <VideoCameraOutlined />,
    label: "Danh sách công ty",
    path: "/manage/list-company",
  },
  {
    key: "6",
    icon: <SwapOutlined />,
    label: "Đổi mật khẩu",
    path: "/manage/change-password",
  },
];
export const dataPosition = [
  { value: "truongphong", label: "Trưởng phòng" },
  { value: "nhanvien", label: "Nhân viên" },
  { value: "giamdoc", label: "Giám đốc" },
  { value: "photruongphong", label: "Phó trường phòng" },
  { value: "truongnhom", label: "Trưởng nhóm" },
];
export const dataScale = [
  { value: "1-9", label: "1 - 9 nhân viên" },
  { value: "10-24", label: "10 - 24 nhân viên" },
  { value: "25-99", label: "25 - 99 nhân viên" },
  { value: "100-499", label: "100 - 499 nhân viên" },
  { value: "500-999", label: "500 - 999 nhân viên" },
  { value: "1000+", label: "1000+ nhân viên" },
  { value: "3000+", label: "3000+ nhân viên" },
  { value: "5000+", label: "5000+ nhân viên" },
];
