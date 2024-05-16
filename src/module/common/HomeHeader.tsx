import { NavLink } from "react-router-dom";
import logo from "../../assets/logo3.png";
interface PropComponent {
  className?: string;
  checkLogin?: boolean;
  setCheckLogin?: any;
}
const HomeHeader: React.FC<PropComponent> = ({ setCheckLogin }) => {
  const handleLogin = () => {
    setCheckLogin(true);
  };
  return (
    <>
      <header className="flex lg:px-28 px-5 pb-3 pt-4 justify-between items-center shadow-md">
        <div className="flex items-center gap-5">
          <img src={logo} alt="" className="w-[45px] object-cover" />
          <ul className="lg:flex hidden gap-2">
            <li className="">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary "
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary "
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary "
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary "
                }
              >
                Dịch vụ
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/support"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary flex gap-4 pl-4 rounded-lg hover:text-primary "
                    : " flex gap-4 pl-4 rounded-lg hover:text-primary "
                }
              >
                Hỗ trợ
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="flex justify-center items-center gap-1">
            <button
              className="px-4 py-3 hover:opacity-80 transition-all bg-primary text-white rounded-md"
              onClick={handleLogin}
            >
              Đăng tuyển & Tìm CV
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
