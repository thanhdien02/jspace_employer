import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EmployerHomeHeader = lazy(
  () => import("../models/employer/EmployerHomeHeader")
);
const LoginPage = lazy(() => import("../page/common/LoginPage"));
import { Outlet } from "react-router-dom";

const LayoutEmployerHomePage: React.FC = () => {
  const { accessToken } = useSelector((state: any) => state.auth);
  const [checkLogin, setCheckLogin] = useState(false);

  useEffect(() => {
    if (accessToken !== "") {
      setCheckLogin(false);
    }
  }, [accessToken]);
  return (
    <>
      {checkLogin ? (
        <LoginPage
          checkLogin={checkLogin}
          actionLogin={setCheckLogin}
          claseNameOverlay="opacity-40"
        ></LoginPage>
      ) : (
        ""
      )}
      <EmployerHomeHeader setCheckLogin={setCheckLogin}></EmployerHomeHeader>
      <div className="bg-white">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutEmployerHomePage;
