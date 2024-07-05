import React from "react";
import LineChartPost from "../../module/dashboard/LineChartPost";
import { Chart, registerables } from "chart.js";
import { PiMoney } from "react-icons/pi";
import { LuUsers } from "react-icons/lu";
import { BsBuilding } from "react-icons/bs";
Chart.register(...registerables);

const EmployerDashboardPage: React.FC = () => {
  return (
    <div className="mx-20 mt-10">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex justify-between rounded-md bg-white p-5 shadow">
          <div>
            <h3 className="font-medium text-gray-500">Danh thu sản phẩm</h3>
            <strong className="mt-3 inline-block text-black font-bold text-xl">
              15.000.000đ
            </strong>
            <p className="text-sm text-gray-500">
              <span className="text-green-500">+15.6% </span>so với tháng trước
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-green-500 flex justify-center items-center self-start ">
            <PiMoney className="text-base text-white" />
          </span>
        </div>
        <div className="flex justify-between rounded-md bg-white p-5 shadow">
          <div>
            <h3 className="font-medium text-gray-500">Số lượng người dùng</h3>
            <strong className="mt-3 inline-block text-black font-bold text-xl">
              450
            </strong>
            <p className="text-sm text-gray-500">
              <span className="text-pink-500">+15.6% </span>so với tháng trước
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-pink-500 flex justify-center items-center self-start ">
            <LuUsers className="text-base text-white" />
          </span>
        </div>
        <div className="flex justify-between rounded-md bg-white p-5 shadow">
          <div>
            <h3 className="font-medium text-gray-500">Số lượng công ty</h3>
            <strong className="mt-3 inline-block text-black font-bold text-xl">
              40
            </strong>
            <p className="text-sm text-gray-500">
              <span className="text-blue-600">+15.6% </span>so với tháng trước
            </p>
          </div>
          <span className="px-2 py-1 rounded bg-blue-600 flex justify-center items-center self-start ">
            <BsBuilding className="text-base text-white" />
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
  );
};

export default EmployerDashboardPage;
