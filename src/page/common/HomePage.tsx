import React, { useState } from "react";
import banner from "../../assets/banner-home5.jpg";
import IconArrowRight from "../../components/icons/IconArrowRight";
import LoginPage from "./LoginPage";
import { CSSTransition } from "react-transition-group";
const HomePage: React.FC = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const handleLogin = () => {
    setCheckLogin(true);
  };
  return (
    <>
      <div>
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
        <div className="relative w-[900px] flex mx-auto mt-2">
          <div className="absolute top-2 left-1/2 -translate-x-[50%] flex flex-col">
            <h2 className="text-4xl font-bold text-center leading-snug w-[600px]">
              Đăng tin tuyển dụng, tìm kiếm ứng viên hiệu quả
            </h2>
            <div
              onClick={handleLogin}
              className="flex gap-2 mt-3 items-center cursor-pointer self-center px-3 py-2 font-medium rounded-md text-white bg-primary"
            >
              <span className="select-none">Bắt đầu đăng tin</span>
              <IconArrowRight classIcon="!w-5 !h-5"></IconArrowRight>
            </div>
          </div>
          <img src={banner} alt="" className="mt-32 w-full object-contain" />
        </div>
      </div>
    </>
  );
};

export default HomePage;
