import React from "react";
import LineChartPost from "../../module/dashboard/LineChartPost";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const EmployerDashboardPage: React.FC = () => {
  return (
    <div className="mx-20 mt-10">
      <div className="flex gap-5">
        {/* <div className="w-[580px] h-[400px] bg-white p-5 shadow-md rounded-md">
          <BarChartUser></BarChartUser>
          <p className="text-base font-medium text-gray-600">
            Số lượng người dùng
          </p>
        </div> */}
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
