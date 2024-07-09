import React, { useEffect } from "react";
import LineChartPost from "../../module/dashboard/LineChartPost";
import { Chart, registerables } from "chart.js";
import { PiMoney } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { AiFillProduct } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { dashboardGetDashboardNumberAll } from "../../store/dashboard/dashboard-slice";
Chart.register(...registerables);

const EmployerDashboardPage: React.FC = () => {
  const { dashboardNumberAll, checkAuth } = useSelector(
    (state: any) => state.dashboard
  );
  const { accessToken, companyAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      accessToken &&
      checkAuth?.hasCompany &&
      checkAuth?.hasFullCredentialInfo &&
      checkAuth?.verifiedByCompany &&
      checkAuth?.companyVerified
    ) {
      dispatch(dashboardGetDashboardNumberAll({ companyId: companyAuth?.id }));
    }
  }, [accessToken]);

  return (
    <>
      {checkAuth?.hasCompany &&
      checkAuth?.hasFullCredentialInfo &&
      checkAuth?.verifiedByCompany &&
      checkAuth?.companyVerified ? (
        <div className="mx-20 mt-10">
          <div className="grid grid-cols-4 gap-5">
            <div className="flex justify-between rounded-md bg-white p-5 shadow">
              <div>
                <h3 className="font-medium text-gray-500">Danh thu sản phẩm</h3>
                <strong className="mt-3 inline-block text-black font-bold text-xl">
                  {dashboardNumberAll?.total_cost}$
                </strong>
              </div>
              <span className="px-2 py-1 rounded bg-green-500 flex justify-center items-center self-start ">
                <PiMoney className="text-base text-white" />
              </span>
            </div>
            <div className="flex justify-between rounded-md bg-white p-5 shadow">
              <div>
                <h3 className="font-medium text-gray-500">
                  Số lượng người ứng tuyển
                </h3>
                <strong className="mt-3 inline-block text-black font-bold text-xl">
                  {dashboardNumberAll?.candidate_number}
                </strong>
              </div>
              <span className="px-2 py-1 rounded bg-pink-500 flex justify-center items-center self-start ">
                <LuUsers className="text-base text-white" />
              </span>
            </div>
            <div className="flex justify-between rounded-md bg-white p-5 shadow">
              <div>
                <h3 className="font-medium text-gray-500">Số lượng bài đăng</h3>
                <strong className="mt-3 inline-block text-black font-bold text-xl">
                  {dashboardNumberAll?.post_number}
                </strong>
              </div>
              <span className="px-2 py-1 rounded bg-blue-600 flex justify-center items-center self-start ">
                <BsBuilding className="text-base text-white" />
              </span>
            </div>
            <div className="flex justify-between rounded-md bg-white p-5 shadow">
              <div>
                <h3 className="font-medium text-gray-500">
                  Số lượng sản phẩm đã mua
                </h3>
                <strong className="mt-3 inline-block text-black font-bold text-xl">
                  {dashboardNumberAll?.product_number}
                </strong>
              </div>
              <span className="px-2 py-1 rounded bg-yellow-500 flex justify-center items-center self-start ">
                <AiFillProduct className="text-base text-white" />
              </span>
            </div>
          </div>
          <div className="flex gap-5 mt-5">
            <div className="w-[580px] h-[400px] bg-white p-5 shadow-md rounded-md">
              <LineChartPost></LineChartPost>
              <p className="text-base font-medium text-gray-600">
                Số lượng bài đăng
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-20 mt-10 font-medium text-lg text-gray-500">
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default EmployerDashboardPage;
