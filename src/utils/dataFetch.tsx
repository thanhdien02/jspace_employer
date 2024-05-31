import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined,
  DashboardOutlined,
  SwapOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import IconBuilding from "../components/icons/IconBuilding";

export const dataSideBar = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    path: "/manage",
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
    key: "7",
    icon: <ScheduleOutlined />,
    label: "Quản lí tin tuyển dụng",
    path: "/manage/jobs",
  },
  {
    key: "8",
    icon: <ShoppingOutlined />,
    label: "Dịch vụ đã mua",
    path: "/manage/products-buyed",
  },
  {
    key: "9",
    icon: <ShoppingCartOutlined />,
    label: "Mua dịch vụ",
    path: "/manage/list-products",
  },

  {
    key: "10",
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
    value: "None Gender",
    label: "None Gender",
  },
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];
export const dataEnterSalary: any = [
  {
    value: "fix",
    label: "Mức lương cố định",
  },
  {
    value: "between",
    label: "Mức lương trong khoản",
  },
  {
    value: "more",
    label: "Mức lương trên bao nhiêu",
  },
  {
    value: "up",
    label: "Mức lương dưới bao nhiêu",
  },
];

export const dataHeaderManageJob = [
  {
    title: "ID",
    className: "w-[50px]",
  },
  {
    title: "Tên công việc",
    className: "w-[400px] ",
  },
  {
    title: "Mức lương",
    className: "w-[250px]",
  },
  {
    title: "Số lượng",
    className: "w-[70px]",
  },
  {
    title: "Vị trí",
    className: "w-[100px]",
  },
  {
    title: "Kinh nghiệm",
    className: "w-[150px]",
  },
  {
    title: "TG làm việc",
    className: "w-[150px]",
  },
  {
    title: "Kỹ năng",
    className: "w-[400px]",
  },
  {
    title: "Ngày đăng",
    className: "w-[150px]",
  },
  {
    title: "Ngày kết thúc",
    className: "w-[150px]",
  },
  {
    title: "Tình trạng",
    className: "absolute right-56 z-10",
  },
  {
    title: "Thực hiện",
    className: "absolute right-[135px] z-10",
  },
  {
    title: "Ứng viên",
    className: "absolute right-10 z-10",
  },
];

export const dataHeaderManageCandidateApplyJob = [
  {
    title: "ID",
    className: "w-[5%]",
  },
  {
    title: "Tên ứng viên",
    className: "w-[18%]",
  },
  {
    title: "Email",
    className: "w-[15%]",
  },
  {
    title: "Số điện thoại",
    className: "w-[12%]",
  },
  {
    title: "CV",
    className: "w-[15%]",
  },
  {
    title: "Tình trạng",
    className: "w-[20%]",
  },
  {
    title: "Chi tiết",
    className: "w-[15%]",
  },
];

export const dataCard = [
  {
    id: "1",
    name: "JSPACE MAX",
    quantity: 3,
    price: 40000000,
  },
  {
    id: "2",
    name: "JSPACE PRO",
    quantity: 2,
    price: 10000000,
  },
  {
    id: "3",
    name: "JSPACE MIN",
    quantity: 5,
    price: 20000000,
  },
  {
    id: "4",
    name: "JSPACE BETA",
    quantity: 1,
    price: 14000000,
  },
  {
    id: "5",
    name: "JSPACE FAST",
    quantity: 3,
    price: 40000000,
  },
];
export const dataColor = [
  {
    id: 0,
    color: "border-blue-500",
  },
  {
    id: 1,
    color: "border-red-500",
  },
  {
    id: 2,
    color: "border-yellow-500",
  },
  {
    id: 3,
    color: "border-pink-500",
  },
  {
    id: 4,
    color: "border-green-500",
  },
  {
    id: 5,
    color: "border-gray-500",
  },
];
