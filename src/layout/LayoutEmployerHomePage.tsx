import React, { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
const HomeHeader = lazy(() => import("../module/common/HomeHeader"));
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginPage from "../page/common/LoginPage";

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
      <CSSTransition
        in={checkLogin}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <LoginPage
          actionLogin={setCheckLogin}
          claseNameOverlay="opacity-40"
        ></LoginPage>
      </CSSTransition>

      <HomeHeader setCheckLogin={setCheckLogin}></HomeHeader>
      <div className="p-2">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutEmployerHomePage;
