import React, { useEffect, useState } from "react";
import { Avatar, Layout, Menu, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/auth";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";
import {
  authFetchMe,
  authLogout,
  authRefreshToken,
} from "../store/auth/auth-slice";
import { Outlet, useNavigate } from "react-router-dom";
import { dataSideBar } from "../utils/dataFetch";
import EmployerManageHeader from "../module/employer/EmployerManageHeader";
const { Sider } = Layout;

const LayoutEmployerManagement: React.FC = () => {
  const { user, messageAuth, loading } = useSelector(
    (state: any) => state.auth
  );
  const { loadingPayment } = useSelector((state: any) => state.payment);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const handleChangeSibar = (e: any) => {
    const path: any = dataSideBar.find((item) => item.key === e.key);
    if (path.label === "Log out") {
      // dispatch(authLogout());
    }
    navigate(path?.path);
  };
  useEffect(() => {
    const token = getToken();
    if (token.accessToken != "null") {
      dispatch(authFetchMe());
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    if (messageAuth === "unauthenticated") {
      dispatch(authRefreshToken());
    } else if (messageAuth === "notpermission") {
      dispatch(authLogout());
      navigate("/");
    }
  }, [messageAuth]);

  return (
    <>
      <EmployerManageHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      ></EmployerManageHeader>
      <Layout className="mt-[65px] bg-white">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="!bg-white"
        >
          <div
            className={`h-full overflow-auto fixed bg-white left-0 ${
              collapsed ? "w-[80px]" : "w-[200px]"
            }`}
          >
            <div
              className="flex gap-4 items-center p-4 cursor-pointer"
              onClick={() => navigate("/manage/update-information-account")}
            >
              {loading ? (
                <div className="w-[45px] h-[45px] rounded-full flex">
                  <Spin className="m-auto" />
                </div>
              ) : user?.picture ? (
                <img
                  src={user?.picture}
                  alt=""
                  className="w-[45px] h-[45px] rounded-full object-cover"
                />
              ) : (
                <Avatar className="mx-auto" size={45} icon={<UserOutlined />} />
              )}

              {collapsed ? (
                ""
              ) : (
                <div className="flex flex-col gap-1">
                  <p className="font-medium line-clamp-2 leading-5">
                    {user?.name}
                  </p>
                  <p className="font-medium line-clamp-1 text-gray-500 text-xs">
                    {user?.role?.code}
                  </p>
                </div>
              )}
            </div>
            <span className="w-full bg-gray-200 h-[1px] block"></span>
            <Menu
              theme="light"
              mode="inline"
              className=""
              items={dataSideBar}
              onClick={handleChangeSibar}
            />
          </div>
        </Sider>
        <Layout className="min-h-svh">
          <Outlet></Outlet>
        </Layout>
      </Layout>

      {loadingPayment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-20">
          <div className="flex flex-col gap-4">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
            <p className="text-white font-sans text-base font-medium">
              Thanh toán đang được xử lí
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutEmployerManagement;
