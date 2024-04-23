import React, { useEffect, useState } from "react";
import LoginPage from "../page/LoginPage";
import { useSelector } from "react-redux";
import EmployerHomeHeader from "../models/employer/EmployerHomeHeader";
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
      <LoginPage
        checkLogin={checkLogin}
        actionLogin={setCheckLogin}
        claseNameOverlay="opacity-40"
      ></LoginPage>
      <EmployerHomeHeader setCheckLogin={setCheckLogin}></EmployerHomeHeader>
      <div className="bg-white">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutEmployerHomePage;
