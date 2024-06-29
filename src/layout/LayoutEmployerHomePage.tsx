import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const HomeHeader = lazy(() => import("../module/common/HomeHeader"));
import { NavLink, Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginPage from "../page/common/LoginPage";
import { authLogout } from "../store/auth/auth-slice";
import { CommentOutlined } from "@ant-design/icons";
import LayoutHomeUserFooter from "../components/footer/LayoutHomeUserFooter";
import IconChervonUp from "../components/icons/IconChervonUp";
import IconHome from "../components/icons/IconHome";
import IconBriefCase from "../components/icons/IconBriefCase";
import IconUser from "../components/icons/IconUser";
import IconNewpaper from "../components/icons/IconNewpaper";
const LayoutEmployerHomePage: React.FC = () => {
  const { accessToken, messageAuth } = useSelector((state: any) => state.auth);
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkScrolltoTop, setCheckScrolltoTop] = useState(false);
  const dispatch = useDispatch();
  const handleLogin = () => {
    setCheckLogin(true);
  };
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
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 400) {
        setCheckScrolltoTop(true);
      } else {
        setCheckScrolltoTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
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
      <div className="">
        <Outlet></Outlet>
      </div>
      <a
        href="https://m.me/267479709792373"
        target="_blank"
        className="fixed z-30 flex md:right-10 right-5 md:w-16 md:h-16 w-14 h-14 md:bottom-10 bottom-20 border-2 border-solid bg-blue-50 border-primary rounded-full hover:opacity-80 transition-all"
      >
        <CommentOutlined className="m-auto text-3xl text-primary" />
      </a>
      <CSSTransition
        in={checkScrolltoTop}
        timeout={200}
        classNames="fade"
        unmountOnExit
      >
        <div
          className="fixed md:bottom-12 bottom-20 z-10 md:left-10 left-5 cursor-pointer bg-primary text-white rounded-full p-[6px]"
          onClick={scrollToTop}
        >
          <IconChervonUp classIcon="!w-6 !h-6"></IconChervonUp>
        </div>
      </CSSTransition>

      {/* Login */}
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
      {/*  */}
      <LayoutHomeUserFooter></LayoutHomeUserFooter>
      <div className="md:hidden fixed right-0 py-1 left-0 bottom-0 bg-white flex justify-evenly h-[60px] border-t-[1px] border-solid border-gray-200">
        <NavLink to="/" className="flex flex-col items-center justify-center">
          <IconHome className="my-1" classIcon="!w-5 !h-5"></IconHome>
          <span className="text-xs">Trang chủ</span>
        </NavLink>
        <NavLink
          to="/products"
          className="flex flex-col items-center justify-center"
        >
          <IconBriefCase className="my-1" classIcon="!w-5 !h-5"></IconBriefCase>
          <span className="text-xs">Dịch vụ</span>
        </NavLink>
        <NavLink
          to="/products"
          className="flex flex-col items-center justify-center"
        >
          <IconNewpaper className="my-1" classIcon="!w-5 !h-5"></IconNewpaper>
          <span className="text-xs">Thông tin</span>
        </NavLink>
        <div
          className="flex flex-col items-center justify-center"
          onClick={handleLogin}
        >
          <IconUser className="my-1" classIcon="!w-5 !h-5"></IconUser>
          <span className="text-xs">Đăng nhập</span>
        </div>
      </div>
    </>
  );
};

export default LayoutEmployerHomePage;
