import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  DashboardOutlined,
  SwapOutlined,
  ScheduleOutlined,
  UsergroupAddOutlined,
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
    path: "/manage/information-company",
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
    label: "Đăng bài",
    path: "/manage/post-job",
  },
  {
    key: "7",
    icon: <ScheduleOutlined />,
    label: "Quản lí công việc",
    path: "/manage/jobs",
  },
  {
    key: "8",
    icon: <UsergroupAddOutlined />,
    label: "Quản lí ứng viên xin việc",
    path: "/manage/candidates",
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
export const dataExperience: any = [
  {
    value: "khongyeucau",
    label: "Không yêu cầu",
  },
  {
    value: "1nam",
    label: "1 năm kinh nghiệm",
  },
  {
    value: "2nam",
    label: "2 năm kinh nghiệm",
  },
  {
    value: "3nam",
    label: "3 năm kinh nghiệm",
  },
  {
    value: "4nam",
    label: "4 năm kinh nghiệm",
  },
  {
    value: "5nam",
    label: "5 năm kinh nghiệm",
  },
];
export const dataAddress: any = [
  {
    value: "hcm",
    label: "TP HCM",
  },
  {
    value: "dongthap",
    label: "Đồng Tháp",
  },
  {
    value: "hanoi",
    label: "Hà Nội",
  },
  {
    value: "cantho",
    label: "Cần Thơ",
  },
];

export const dataSkills: any = [
  {
    value: "JAVA",
    label: "JAVA",
  },
  {
    value: "React JS",
    label: "React JS",
  },
  {
    value: "TypeScript",
    label: "TypeScript",
  },
  {
    value: "Spring Boot",
    label: "Spring Boot",
  },
  {
    value: "Javascript",
    label: "Javascript",
  },
  {
    value: "HTML",
    label: "HTML",
  },
  {
    value: "CSS",
    label: "CSS",
  },
  {
    value: "Vue",
    label: "Vue",
  },
  {
    value: "Kỹ thuật lập trình",
    label: "Kỹ thuật lập trình",
  },
  {
    value: "Quan hện công chúng a",
    label: "Quan hện công chúng a",
  },
  {
    value: "Quan hện công chúng b",
    label: "Quan hện công chúng b",
  },
  {
    value: "Quan hện công chúng c",
    label: "Quan hện công chúng c",
  },
];
export const dataTimeWork: any = [
  {
    value: "fulltime",
    label: "Full time",
  },
  {
    value: "parttime",
    label: "Part time",
  },
];
export const dataGender: any = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Other",
    label: "Other",
  },
];

export const dataHeaderManageJob = [
  {
    title: "ID",
    width: "4%",
  },
  {
    title: "Tên công việc",
    width: "15%",
  },
  {
    title: "Mức lương",
    width: "8%",
  },
  {
    title: "Số lượng",
    width: "5%",
  },
  {
    title: "Vị trí",
    width: "5%",
  },
  {
    title: "Giới tính",
    width: "5%",
  },
  {
    title: "TG làm việc",
    width: "5%",
  },
  {
    title: "Kỹ năng",
    width: "15%",
  },
  {
    title: "Ngày đăng",
    width: "8%",
  },
  {
    title: "Ngày kết thúc",
    width: "8%",
  },
  {
    title: "Tình trạng",
    width: "10%",
    className: "absolute right-24 z-10",
  },

  {
    title: "Thực hiện",
    width: "10%",
    className: "absolute right-3 z-10",
  },
];
