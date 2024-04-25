import { Progress, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import IconCheck from "../../components/icons/IconCheck";

const EmployerCheckWorkRequiredBeforePostJobPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="mx-auto max-w-[550px] my-5 mt-10">
        <div className="">
          <h2 className="text-xl font-bold">
            Xin chào, <span className="text-primary">{user?.name}</span>
          </h2>
          <p className="mt-2 font-medium">
            Vui lòng thực hiện các bước xác thực dưới đây để bắt đầu đăng tin và
            nhận hồ sơ ứng tuyển cho tin tuyển dụng của bạn.
          </p>
        </div>

        <div className="shadow-sm p-6 bg-white rounded-md mt-5">
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-base">Tiến độ hoàn thành</h3>
            <Tooltip title="Các mục đã hoàn thành">
              <Progress steps={3} percent={50} size={[120, 15]} />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <NavLink
              to="/manage/update-information-account"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              <IconCheck></IconCheck>
              <span className="font-medium text-base">
                Cập nhật thông tin tài khoản
              </span>
            </NavLink>
            <NavLink
              to="/manage/update-information-company"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              <IconCheck></IconCheck>
              <span className="font-medium text-base">
                Cập nhật thông tin công ty
              </span>
            </NavLink>
            <NavLink
              to="/manage/"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              <IconCheck></IconCheck>
              <span className="font-medium text-base">Xác thực tài khoản</span>
            </NavLink>
          </div>
          <div className="mt-4 text-gray-500 font-medium text-xs px-5">
            <p>
              Hoàn thành danh sách trên để tăng mức độ uy tín thương hiệu tuyển
              dụng của công ty & bảo vệ thương hiệu tuyển dụng trước các đối
              tượng giả mạo
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerCheckWorkRequiredBeforePostJobPage;
