import { Avatar, Button, Spin } from "antd";
import React, { useEffect, useState } from "react";
import {
  CaretDownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import IconBell from "../../components/icons/IconBell";
import { authLogout } from "../../store/auth/auth-slice";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import IconCart from "../../components/icons/IconCart";
import { UserOutlined } from "@ant-design/icons";
import HeaderNotificationPage from "./HeaderNotificationPage";
import { notificationGetNotification } from "../../store/notification/notification-slice";
interface PropComponent {
  collapsed?: any;
  setCollapsed?: any;
}
const EmployerManageHeader: React.FC<PropComponent> = ({
  collapsed,
  setCollapsed,
}) => {
  const { carts } = useSelector((state: any) => state.cart);
  const { notifications } = useSelector((state: any) => state.notification);
  const { user, loading, companyAuth } = useSelector(
    (state: any) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notificationCheck, setNotificationCheck] = useState(false);
  const [numberRead, setNumberRead] = useState(0);
  useEffect(() => {
    dispatch(notificationGetNotification({ companyId: companyAuth?.id }));
  }, [companyAuth?.id]);
  useEffect(() => {
    if (notifications?.length > 0) {
      const countRead = notifications.filter(
        (notification: any) => !notification.read
      ).length;
      setNumberRead(countRead);
    } else setNumberRead(0);
  }, [notifications]);
  return (
    <header className="fixed z-20 h-[65px] top-0 left-0 right-0 flex px-4 py-2 justify-between items-center bg-slate-800">
      <div className="ml-2">
        <Button
          type="text"
          icon={
            collapsed ? (
              <MenuUnfoldOutlined className="!p-2" />
            ) : (
              <MenuFoldOutlined className="!p-2" />
            )
          }
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
          }}
          className="text-white hover:!text-primary hover:!bg-white "
        />
      </div>

      <div className="flex gap-5 items-center">
        <button
          className="relative flex items-center gap-2 text-white bg-gray-100/20 p-2 text-sm rounded-xl px-4 font-medium"
          onClick={() => {
            navigate("/manage/shopping-cart");
          }}
        >
          <IconCart classIcon="!w-5 !h-5"></IconCart>
          <span>Giỏ hàng</span>
          {carts?.length > 0 && (
            <span className="absolute -top-2 -right-2 flex justify-center text-base items-center w-6 h-6 bg-red-500 text-white rounded-full">
              {carts?.length}
            </span>
          )}
        </button>
        <button
          className="flex items-center gap-2 text-white bg-gray-100/20 p-2 text-sm rounded-xl px-4 font-medium"
          onClick={() => {
            navigate("/manage/check-work-required");
          }}
        >
          <PlusOutlined />
          <span>Đăng tin</span>
        </button>
        <div className="relative">
          <span onClick={() => setNotificationCheck(!notificationCheck)}>
            <IconBell className="p-2 bg-gray-100/20 block rounded-full cursor-pointer"></IconBell>
          </span>
          {numberRead != 0 && (
            <span className="absolute -top-2 -right-2 px-2 font-medium block bg-red-500 text-white rounded-full text-center">
              {numberRead}
            </span>
          )}
          {notificationCheck && (
            <>
              <HeaderNotificationPage></HeaderNotificationPage>
              <div
                onClick={() => setNotificationCheck(!notificationCheck)}
                className="fixed inset-0 z-10 bg-transparent cursor-pointer"
              ></div>
            </>
          )}
        </div>
        <div className="relative group flex gap-3 items-start cursor-pointer px-4 py-2 rounded-lg transition-all ">
          {loading ? (
            <div className="w-[40px] h-[40px] rounded-full flex">
              <Spin className="m-auto" />
            </div>
          ) : user?.picture ? (
            <img
              src={user?.picture}
              alt=""
              className="w-[40px] h-[40px] object-cover self-center rounded-full"
            />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full flex">
              <Avatar className="mx-auto" size={40} icon={<UserOutlined />} />
            </div>
          )}
          <div className="">
            <p className="font-semibold text-sm text-white max-w-[150px] line-clamp-2">
              {user?.name}
            </p>
            <p className="text-xs text-white">{user?.role?.code}</p>
          </div>
          <CaretDownOutlined className="self-auto text-white" />

          <div className="group-hover:block hidden  absolute bg-transparent mt-10 right-0 shadow-md">
            <div className="mt-2 bg-white">
              <div
                className="px-4 py-2 min-w-[150px] line-clamp-1 hover:text-primary hover:bg-gray-100"
                onClick={() => {
                  dispatch(authLogout());
                  navigate("/");
                }}
              >
                Đăng xuất
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EmployerManageHeader;
