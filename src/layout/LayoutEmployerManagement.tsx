import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import AdminManageHeader from "../module/Admin/AdminManageHeader";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../utils/auth";
import { authFetchMe } from "../store/auth/auth-slice";
import { Outlet, useNavigate } from "react-router-dom";
import { dataSideBar } from "../utils/dataFetch";
import logo from "../assets/logo3.png";
const { Sider, Content } = Layout;

const LayoutEmployerManagement: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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

  return (
    <>
      <AdminManageHeader
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      ></AdminManageHeader>
      <Layout className="mt-[65px] bg-white" hasSider>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="!bg-white"
        >
          <div
            className={`h-full overflow-auto fixed  bg-white left-0 ${
              collapsed ? "w-[80px]" : "w-[200px]"
            }`}
          >
            <div className="flex gap-4 items-center p-4">
              <img src={logo} alt="" className="w-[45px] h-[45px]" />
              {collapsed ? (
                ""
              ) : (
                <p className="font-medium line-clamp-1">{user.name}</p>
              )}
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              theme="light"
              mode="inline"
              className=""
              // defaultSelectedKeys={["1"]}
              items={dataSideBar}
              onClick={handleChangeSibar}
            />
          </div>
        </Sider>
        <Layout className="">
          <Content
            className="h-full overflow-auto"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutEmployerManagement;
