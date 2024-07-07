import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardGetDashboardPostMonth,
  dashboardGetDashboardPostYear,
} from "../../store/dashboard/dashboard-slice";
import { dataMonth, dataYear } from "../../utils/dataFetch";
import { Line } from "react-chartjs-2";
import ExportExcel from "../../components/export/ExportExcel";

const options = {
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
    },
  },
};
const generateDataPost = (
  timeframe: "month" | "year",
  monthlyData: any,
  yearlyData: any
) => {
  let labels: any = [];
  let counts = [];
  if (timeframe === "month" && monthlyData) {
    labels = Array.from(
      { length: Object.keys(monthlyData).length },
      (_, i) => i + 1
    );
    counts = labels.map((day: any) => monthlyData[day] || 0);
  } else if (timeframe === "year" && yearlyData) {
    labels = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
    counts = labels.map((_: any, month: any) => yearlyData[month + 1] || 0);
  }
  return {
    labels: labels,
    datasets: [
      {
        label: "Bài đăng",
        data: counts,
        backgroundColor: "rgba(103, 133, 233, 0.2)",
        borderColor: "#14a6db",
        borderWidth: 0.8,
      },
    ],
  };
};
const LineChartPost = () => {
  const { dashboardPostMonth, dashboardPostYear } = useSelector(
    (state: any) => state.dashboard
  );
  const { companyAuth } = useSelector((state: any) => state.auth);
  const [month, setMonth] = useState<any>(`Tháng ${new Date().getMonth() + 1}`);
  const [year, setYear] = useState<any>(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState(null);
  const [yearlyData, setYearlyData] = useState(null);
  const [timeframe, setTimeframe] = useState<"month" | "year">("month");
  const handleTimeRangeChange = (range: "year" | "month") => {
    setTimeframe(range);
    if (range === "month") {
      dispatch(
        dashboardGetDashboardPostMonth({
          company_id: companyAuth?.id,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
        })
      );
      setMonth(`Tháng ${new Date().getMonth() + 1}`);
      setYear(new Date().getFullYear());
    } else if (range === "year") {
      dispatch(
        dashboardGetDashboardPostYear({
          company_id: companyAuth?.id,
          year: new Date().getFullYear(),
        })
      );
      setYear(new Date().getFullYear());
    }
  };
  const data: any = generateDataPost(timeframe, monthlyData, yearlyData);
  const dispatch = useDispatch();
  const [dataExport, setDataExport] = useState<any>(null);
  useEffect(() => {
    if (companyAuth?.id) console.log("object");
    dispatch(
      dashboardGetDashboardPostMonth({
        company_id: companyAuth?.id,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      })
    );
  }, [companyAuth]);
  useEffect(() => {
    if (dashboardPostMonth) {
      setMonthlyData(dashboardPostMonth);

      const transformedArray: any = Object.entries(dashboardPostMonth).map(
        ([key, value]) => {
          return {
            THÁNG: Number(key),
            "SỐ LƯỢNG": value,
          };
        }
      );
      setDataExport(transformedArray);
    }
  }, [dashboardPostMonth]);
  useEffect(() => {
    if (dashboardPostYear) {
      setYearlyData(dashboardPostYear);
      const transformedArray: any = Object.entries(dashboardPostYear).map(
        ([key, value]) => ({
          NĂM: Number(key),
          "SỐ LƯỢNG": value,
        })
      );
      setDataExport(transformedArray);
    }
  }, [dashboardPostYear]);

  const onChangeMonth = (e: any) => {
    setMonth(e);
    dispatch(
      dashboardGetDashboardPostMonth({
        company_id: companyAuth?.id,
        year: year,
        month: e,
      })
    );
  };
  const onChangeYearofMonth = (e: any) => {
    setYear(e);
    dispatch(
      dashboardGetDashboardPostMonth({
        company_id: companyAuth?.id,
        year: e,
        month: month,
      })
    );
  };
  const onChangeYear = (e: any) => {
    dispatch(
      dashboardGetDashboardPostYear({ company_id: companyAuth?.id, year: e })
    );
  };

  return (
    <>
      <div className="w-full">
        <div className="flex gap-2">
          <button
            className={`ml-2 min-w-[80px] px-3 py-1 rounded ${
              timeframe == "month"
                ? "bg-white text-primary border border-solid border-primary"
                : "bg-gray-200"
            } `}
            onClick={() => handleTimeRangeChange("month")}
          >
            Tháng
          </button>
          <button
            className={`ml-2 min-w-[80px] px-3 py-1 rounded ${
              timeframe == "year"
                ? "bg-white text-primary border border-solid border-primary"
                : "bg-gray-200"
            } `}
            onClick={() => handleTimeRangeChange("year")}
          >
            Năm
          </button>
          {timeframe === "month" ? (
            <div className="flex gap-2">
              <Select
                placeholder="Tháng"
                value={month}
                className="!py-0 ml-2 w-[120px] select-filter"
                onChange={onChangeMonth}
                options={dataMonth}
              />
              <Select
                placeholder="Năm"
                value={year}
                className="!py-0 ml-2 w-[120px] select-filter"
                onChange={onChangeYearofMonth}
                options={dataYear}
              />
            </div>
          ) : (
            <>
              <Select
                value={year}
                placeholder="Năm"
                className="!py-0 ml-2 w-[120px] select-filter"
                onChange={onChangeYear}
                options={dataYear}
              />
            </>
          )}
          <ExportExcel
            data={dataExport}
            nameFile="DanhSach"
            title="Export"
            className="px-2 py-1 rounded border border-solid border-gray-200 hover:opacity-80 transition-all"
          />
        </div>
        <div className="w-full mt-3">
          {data?.labels?.length > 0 && <Line data={data} options={options} />}
        </div>
      </div>
    </>
  );
};
export default LineChartPost;
