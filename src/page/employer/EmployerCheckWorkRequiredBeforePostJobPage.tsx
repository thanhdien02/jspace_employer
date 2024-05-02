import { Progress, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import IconCheck from "../../components/icons/IconCheck";
import IconText from "../../components/icons/IconText";

const EmployerCheckWorkRequiredBeforePostJobPage: React.FC = () => {
  const { user, checkAuth } = useSelector((state: any) => state.auth);
  const [proccessCheckIdentification, setProccessCheckIdentification] =
    useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setProccessCheckIdentification(0);
    if (checkAuth.hasFullCredentialInfo) {
      setProccessCheckIdentification(proccessCheckIdentification + 33.33);
    }
    if (checkAuth?.hasCompany && checkAuth?.companyVerified) {
      setProccessCheckIdentification(proccessCheckIdentification + 33.33);
    }
    if (checkAuth?.verifiedByCompany) {
      setProccessCheckIdentification(proccessCheckIdentification + 33.33);
    }
  }, [checkAuth]);

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
              <Progress
                steps={3}
                percent={proccessCheckIdentification}
                size={[120, 15]}
              />
            </Tooltip>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            <NavLink
              to="/manage/update-information-account"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              {checkAuth?.hasFullCredentialInfo ? (
                <IconCheck></IconCheck>
              ) : (
                <IconText></IconText>
              )}
              <span className="font-medium text-base">
                Cập nhật thông tin tài khoản
              </span>
            </NavLink>
            <NavLink
              to="/manage/information-company"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              {checkAuth?.hasCompany && checkAuth?.companyVerified ? (
                <IconCheck></IconCheck>
              ) : (
                <IconText></IconText>
              )}
              <span className="font-medium text-base">
                Cập nhật thông tin công ty
              </span>
            </NavLink>
            <NavLink
              to="/manage/"
              className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
            >
              {checkAuth?.verifiedByCompany ? (
                <IconCheck></IconCheck>
              ) : (
                <IconText></IconText>
              )}
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
