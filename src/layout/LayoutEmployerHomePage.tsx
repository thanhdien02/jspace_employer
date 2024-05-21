import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const HomeHeader = lazy(() => import("../module/common/HomeHeader"));
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginPage from "../page/common/LoginPage";
import { authLogout } from "../store/auth/auth-slice";

const LayoutEmployerHomePage: React.FC = () => {
  const { accessToken, messageAuth } = useSelector((state: any) => state.auth);
  const [checkLogin, setCheckLogin] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (accessToken !== "") {
      setCheckLogin(false);
    }
  }, [accessToken]);
  useEffect(() => {
    if (messageAuth === "notpermission") {
      dispatch(authLogout());
    }
  }, [messageAuth]);
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
