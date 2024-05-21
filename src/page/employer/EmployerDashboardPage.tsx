import React, { useEffect } from "react";

const EmployerDashboardPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="mx-10 mt-5 bg-white p-5 shadow">Dashboard</div>
    </>
  );
};

export default EmployerDashboardPage;
