import { Avatar, Button } from "antd";
import React from "react";
import {
  UserOutlined,
  CaretDownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
interface PropComponent {
  collapsed?: any;
  setCollapsed?: any;
}
const AdminHeader: React.FC<PropComponent> = ({ collapsed, setCollapsed }) => {
  const { user } = useSelector((state: any) => state.auth);
  return (
    <header className="flex px-4 py-2 justify-between items-center bg-slate-800">
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
      <div className="flex gap-3 items-start cursor-pointer px-4 py-2 rounded-lg transition-all hover:text-white">
        <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
          className="self-center"
        />
        <div className="">
          <p className="font-semibold text-sm text-white">{user?.username}</p>
          <p className="text-xs text-white">{user?.role}</p>
        </div>
        <CaretDownOutlined className="self-auto text-white" />
      </div>
    </header>
  );
};

export default AdminHeader;
