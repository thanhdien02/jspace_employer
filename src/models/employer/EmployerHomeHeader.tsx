import { NavLink } from "react-router-dom";
import logo from "../../assets/logo3.png";
import { UserOutlined } from "@ant-design/icons";
const EmployerHomeHeader = () => {
  return (
    <>
      <header className="flex lg:px-20 px-5 pb-3 pt-4 justify-between items-center ">
        <div className="flex items-center gap-5">
          <img src={logo} alt="" className="w-[45px] object-cover" />
          <ul className="lg:flex hidden gap-2">
            <li className="">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/companys"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                }
              >
                Công ty
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary font-semibold"
                }
              >
                Bài viết
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="">
          {!true ? (
            <div className="flex justify-center items-center gap-1">
              <button
                className="px-2 py-2 hover:text-primary"
                // onClick={() => actionLogin(true)}
              >
                Đăng nhập
              </button>
              <span className="w-[2px] h-[25px] bg-slate-700/30"></span>
              <button className="px-2 py-2 hover:text-primary">
                Đăng bài tuyển dụng
              </button>
            </div>
          ) : (
            <UserOutlined
              //   onClick={() => actionLogin(true)}
              style={{ fontSize: "20px", color: "#08c" }}
              className="hover:text-black transition-all hover:bg-blue-100 p-2 rounded-full cursor-pointer"
            />
          )}
        </div>
      </header>
    </>
  );
};

export default EmployerHomeHeader;
