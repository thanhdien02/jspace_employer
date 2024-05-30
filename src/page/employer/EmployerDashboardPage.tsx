import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
Chart.register(...registerables);

const generateData = (timeRange: "day" | "week" | "month") => {
  const labels = [];
  const data = [];

  if (timeRange === "day") {
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      data.push(Math.floor(Math.random() * 100));
    }
  } else if (timeRange === "week") {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    labels.push(...daysOfWeek);
    for (let i = 0; i < daysOfWeek.length; i++) {
      data.push(Math.floor(Math.random() * 100));
    }
  } else if (timeRange === "month") {
    for (let i = 1; i <= 15; i++) {
      labels.push(`Day ${i}`);
      data.push(Math.floor(Math.random() * 100));
    }
  }

  return {
    labels,
    datasets: [
      {
        label: "Dataset",
        data,
        fill: false,
        backgroundColor: "rgba(133, 218, 218, 0.2)",
        borderColor: "#6172cb",
      },
    ],
  };
};
const generateRevenueData = (
  timeRange: "day" | "week" | "month" | "quarter"
) => {
  const labels = [];
  const data = [];

  if (timeRange === "day") {
    for (let i = 0; i < 24; i++) {
      labels.push(`${i}:00`);
      data.push(Math.floor(Math.random() * 1000));
    }
  } else if (timeRange === "week") {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    labels.push(...daysOfWeek);
    for (let i = 0; i < daysOfWeek.length; i++) {
      data.push(Math.floor(Math.random() * 7000));
    }
  } else if (timeRange === "month") {
    for (let i = 1; i <= 30; i++) {
      labels.push(`Day ${i}`);
      data.push(Math.floor(Math.random() * 30000));
    }
  } else if (timeRange === "quarter") {
    const monthsOfQuarter = ["Jan", "Feb", "Mar"];
    labels.push(...monthsOfQuarter);
    for (let i = 0; i < monthsOfQuarter.length; i++) {
      data.push(Math.floor(Math.random() * 90000));
    }
  }

  return {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
};

const generateRevenueDataProduct = (
  timeRange: "day" | "week" | "month" | "quarter"
) => {
  const labels = [
    "JSPACE MAX",
    "JSPACE MIN",
    "JSPACE PRO",
    "JSPACE TOP",
    "JSPACE EPS",
  ];
  const data = [];

  if (timeRange === "day") {
    for (let i = 0; i < labels.length; i++) {
      data.push(Math.floor(Math.random() * 1000));
    }
  } else if (timeRange === "week") {
    for (let i = 0; i < labels.length; i++) {
      data.push(Math.floor(Math.random() * 7000));
    }
  } else if (timeRange === "month") {
    for (let i = 0; i < labels.length; i++) {
      data.push(Math.floor(Math.random() * 30000));
    }
  } else if (timeRange === "quarter") {
    for (let i = 0; i < labels.length; i++) {
      data.push(Math.floor(Math.random() * 90000));
    }
  }

  return {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const NumberLineChart = () => {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day");

  const handleTimeRangeChange = (range: "day" | "week" | "month") => {
    setTimeRange(range);
  };

  const data = generateData(timeRange);
  console.log("🚀 ~ data:", data);
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <div className="w-full">
        <div>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChange("day")}
          >
            Day
          </button>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChange("week")}
          >
            Week
          </button>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChange("month")}
          >
            Month
          </button>
        </div>
        <div className="w-full">
          <Line data={data} options={options} className="w-full" />
        </div>
      </div>
    </>
  );
};

const ChartIncom: React.FC = () => {
  const [timeRangeInCom, setTimeRangeIncom] = useState<
    "day" | "week" | "month" | "quarter"
  >("day");

  const handleTimeRangeChangeIncom = (
    range: "day" | "week" | "month" | "quarter"
  ) => {
    setTimeRangeIncom(range);
  };

  const dataIncom = generateRevenueData(timeRangeInCom);

  const options1 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <>
      <div className="">
        <div>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChangeIncom("day")}
          >
            Day
          </button>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChangeIncom("week")}
          >
            Week
          </button>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChangeIncom("month")}
          >
            Month
          </button>
          <button
            className="ml-2 px-3 py-1 rounded-md bg-gray-200"
            onClick={() => handleTimeRangeChangeIncom("quarter")}
          >
            Quarter
          </button>
        </div>
        <Line data={dataIncom} options={options1} />
      </div>
    </>
  );
};

const RevenuePieChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<
    "day" | "week" | "month" | "quarter"
  >("day");

  const handleTimeRangeChange = (
    range: "day" | "week" | "month" | "quarter"
  ) => {
    setTimeRange(range);
  };

  const data = generateRevenueDataProduct(timeRange);

  const options: any = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full mt-5">
      <div className="w-full flex gap-2">
        <button
          className="ml-2 px-3 py-1 rounded-md bg-gray-200"
          onClick={() => handleTimeRangeChange("day")}
        >
          Ngày
        </button>
        <button
          className="ml-2 px-3 py-1 rounded-md bg-gray-200"
          onClick={() => handleTimeRangeChange("week")}
        >
          Tuần
        </button>
        <button
          className="ml-2 px-3 py-1 rounded-md bg-gray-200"
          onClick={() => handleTimeRangeChange("month")}
        >
          Tháng
        </button>
        <button
          className="ml-2 px-3 py-1 rounded-md bg-gray-200"
          onClick={() => handleTimeRangeChange("quarter")}
        >
          Quý
        </button>
      </div>
      <div className="w-[600px] h-[600px] mt-5">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};
const EmployerDashboardPage: React.FC = () => {
  //

  return (
    <div className="mx-20 mt-10">
      <div className="grid grid-cols-2">
        <NumberLineChart></NumberLineChart>
        {/*  */}
        <ChartIncom></ChartIncom>
      </div>

      <RevenuePieChart></RevenuePieChart>
    </div>
  );
};

export default EmployerDashboardPage;
