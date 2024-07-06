import React, { useEffect, useState } from "react";
import banner from "../../assets/Banner1.svg";
import IconArrowRight from "../../components/icons/IconArrowRight";
import LoginPage from "./LoginPage";
import { CSSTransition } from "react-transition-group";
import { Skeleton } from "antd";
const HomePage: React.FC = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const [checkImage, setCheckImage] = useState(false);
  const handleLogin = () => {
    setCheckLogin(true);
  };
  useEffect(() => {
    setCheckImage(true);
  }, []);
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
        <div className="relative md:w-[60%] flex mx-auto mt-1">
          <div className="mt-5 absolute top-2 left-1/2 -translate-x-[50%] flex flex-col">
            <h2 className="md:text-4xl text-xl font-bold text-center leading-snug md:w-[600px] w-[300px] max-w-full">
              Đăng tin tuyển dụng, tìm kiếm ứng viên hiệu quả
            </h2>
            <div
              onClick={handleLogin}
              className="flex gap-2 mt-3 items-center cursor-pointer self-center px-5 py-2 font-medium rounded-md text-primary border border-solid border-primary hover:opacity-80 transition-all"
            >
              <span className="select-none ">Đăng tin ngay</span>
              <IconArrowRight classIcon="!w-5 !h-5"></IconArrowRight>
            </div>
          </div>
          {checkImage ? (
            <img
              src={banner}
              alt=""
              className="w-full object-cover h-[500px] object-center lg:mt-36 mt-16"
            />
          ) : (
            <div className="mt-36 w-full object-contain">
              <Skeleton />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
