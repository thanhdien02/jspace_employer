import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "../assets/logo3.png";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import IconClose from "../components/icons/IconClose";
import { authLogin, authUpdateLoadingRedux } from "../store/auth/auth-slice";

interface PropComponent {
  className?: string;
  claseNameOverlay?: string;
  checkLogin?: boolean;
  actionLogin?: any;
}
const LoginPage: React.FC<PropComponent> = ({
  className = "",
  checkLogin,
  actionLogin,
  claseNameOverlay,
}) => {
  const { loading, accessToken } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login: any = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        dispatch(authUpdateLoadingRedux({ loading: true }));
        const dataEmail = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        dispatch(authLogin(dataEmail.data));
      } catch (error) {}
    },
  });

  useEffect(() => {
    const elementBody = document.body;
    if (checkLogin) {
      elementBody.style.overflow = "hidden";
    } else {
      elementBody.style.overflow = "visible";
    }
  }, [checkLogin]);

  useEffect(() => {
    if (accessToken != "") {
      navigate("/manage");
    }
  }, [accessToken]);
  return (
    <div
      className={`  flex fixed inset-0 transition-all z-10 ${className} ${
        checkLogin ? "block" : "hidden"
      } `}
    >
      <div
        className={`m-auto absolute inset-0 bg-black/30 ${claseNameOverlay}`}
        onClick={() => actionLogin(false)}
      ></div>
      <div className="m-auto">
        <form
          action=""
          className="relative p-6 rounded-lg my-5 bg-white min-h-[250px] min-w-[380px] shadow-lg border-solid border border-slate-500/30"
          onSubmit={() => {}}
        >
          <IconClose
            actionCloseLogin={actionLogin}
            className="absolute top-2 right-2 hover:bg-blue-200 hover:text-white transition-all p-1 rounded-lg"
          ></IconClose>

          <div className="flex justify-center flex-col items-center gap-2 mb-5">
            <NavLink to="/" className="block">
              <img src={logo} alt="" className="max-w-[50px]" />
            </NavLink>
            <h1 className="text-center text-primary font-bold text-2xl tracking-wider">
              JSPACE
            </h1>
          </div>
          <div className="max-w-[400px] mb-5 px-2">
            <h4 className="mb-2 text-lg font-semibold">
              Bạn đã sẵn sàng thực hiện bước tiếp theo?
            </h4>
            <p className="font-normal text-xs text-slate-500">
              Bằng cách tạo tài khoản hoặc đăng nhập, bạn hiểu và đồng ý với
              Điều khoản. Bạn cũng xác nhận chính sách Cookie và Quyền riêng tư
              của Indeed. Bạn đồng ý nhận tin nhắn tiếp thị từ Indeed và có thể
              hủy bỏ việc nhận tin nhắn như vậy bằng cách mở liên kết hủy đăng
              ký trong tin nhắn của chúng tôi hoặc như được chỉ dẫn trong điều
              khoản của chúng tôi.
            </p>
          </div>
          <div className="flex px-2 pb-2">
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              className="bg-primary m-auto min-w-[400px] flex gap-3 justify-center items-baseline !transition-all"
              size={"large"}
              loading={loading}
              onClick={() => login()}
            >
              Đăng nhập với Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
