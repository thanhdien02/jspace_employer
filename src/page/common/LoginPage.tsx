import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Checkbox, CheckboxProps, Spin } from "antd";
import logo from "../../assets/logo3.png";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import IconClose from "../../components/icons/IconClose";
import {
  authLogin,
  authLoginWithEmailPassword,
  authUpdateLoadingRedux,
  authUpdateMessageRedux,
} from "../../store/auth/auth-slice";
import { getToken } from "../../utils/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  EyeOutlined,
  GoogleOutlined,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import IconKey from "../../components/icons/IconKey";
interface PropComponent {
  className?: string;
  claseNameOverlay?: string;
  actionLogin?: any;
}
interface Inputs {
  email?: string;
  password?: string;
}
const LoginPage: React.FC<PropComponent> = ({
  className = "",
  actionLogin,
  claseNameOverlay,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataLogin: Inputs) => {
    if (dataLogin?.email && dataLogin?.password)
      dispatch(
        authLoginWithEmailPassword({
          email: dataLogin?.email,
          password: dataLogin?.password,
        })
      );
  };
  const { loading, accessToken, user, messageAuth, loadingEmailPassword } =
    useSelector((state: any) => state.auth);
  const [email, setEmail] = useState(null);
  const [showpassword, setShowPassword] = useState(false);
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
        setEmail(dataEmail?.data?.email);
      } catch (error) {}
    },
  });

  useEffect(() => {
    const elementBody = document.body;
    elementBody.style.overflow = "hidden";
    return () => {
      elementBody.style.overflow = "visible";
    };
  }, []);
  useEffect(() => {
    if (messageAuth == "register") {
      navigate(`/register/${email}`);
      dispatch(authUpdateMessageRedux({ messageAuth: "" }));
    }
  }, [messageAuth]);

  useEffect(() => {
    if (accessToken != "" && user?.role?.code == "EMPLOYEE") {
      navigate("/manage");
    }
  }, [accessToken]);

  useEffect(() => {
    const token = getToken();
    if (token.accessToken == "null") {
    } else if (token.accessToken != "") {
      navigate("/manage");
    }
  }, []);
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div
      className={` flex fixed inset-0 z-40 ${className}
       `}
    >
      <div
        className={`m-auto absolute inset-0 bg-black/60 ${claseNameOverlay}`}
        onClick={() => {
          if (!loading) {
            actionLogin(false);
          }
        }}
      ></div>
      <div className="m-auto px-5">
        <form
          action=""
          className="relative md:p-10 p-5 rounded-lg my-5 bg-white min-h-[250px] md:min-w-[380px] shadow-lg border-solid border border-slate-500/30"
          onSubmit={handleSubmit(onSubmit)}
        >
          <IconClose
            actionCloseLogin={!loading ? actionLogin : () => {}}
            className="absolute top-2 right-2 hover:bg-slate-200 rounded-sm cursor-pointer"
          ></IconClose>

          <div className="flex justify-center flex-col items-center gap-2 mb-5">
            <NavLink to="/" className="block">
              <img src={logo} alt="" className="max-w-[50px]" />
            </NavLink>
            <h1 className="text-center text-primary font-bold text-2xl tracking-wider">
              JSPACE
            </h1>
          </div>
          <div className="w-full">
            <div className="flex items-center mb-2">
              <h4 className=" text-base font-semibold">
                Bạn đã sẵn sàng để đăng nhập ?
              </h4>
              <p
                className="ml-auto text-sm cursor-pointer hover:text-primary transition-all font-medium"
                onClick={() => login()}
              >
                Đăng ký tài khoản
              </p>
            </div>

            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Email
              </label>
              <div className="mt-2 relative">
                <UserOutlined
                  style={{
                    color: "rgb(156 163 175)",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(60%, 75%)",
                  }}
                />
                <input
                  {...register("email", {
                    required: true,
                    maxLength: 40,
                    minLength: 5,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Trường yêu cầu email",
                    },
                  })}
                  type="email"
                  placeholder="join@gmail.com"
                  autoComplete="off"
                  className=" focus:border-solid h-full focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-2 border border-stone-200 border-solid w-full rounded-md"
                />
                <p className="text-red-600 text-sm py-2">
                  {" "}
                  {errors?.email?.type === "required"
                    ? "*Bạn chưa điền tài khoản."
                    : errors?.email?.type === "maxLength"
                    ? "*Tài khoản không được quá 40 ký tự"
                    : errors?.email?.type === "minLength"
                    ? "*Tài khoản không được ít hơn 5 ký tự"
                    : errors?.email?.type === "pattern"
                    ? "*Tài khoản phải là email"
                    : ""}
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-600"
              >
                Mật khẩu
              </label>
              <div className="mt-2 relative">
                <div
                  onClick={() => setShowPassword(!showpassword)}
                  className="absolute top-1/2 right-1 -translate-y-[50%] cursor-pointer flex  h-full text-center px-2 text-sm rounded-r-md"
                >
                  <EyeOutlined className="hover:text-primary transition-all text-base" />
                </div>
                <IconKey className="absolute top-0 left-0 translate-x-[50%] text-gray-400 translate-y-[50%] !w-5 !h-5"></IconKey>
                <input
                  {...register("password", {
                    required: true,
                    maxLength: 40,
                    minLength: 8,
                  })}
                  placeholder="*************"
                  id="password"
                  name="password"
                  type={showpassword ? "text" : "password"}
                  autoComplete="password"
                  className="h-full focus:border-solid  focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-2 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              <p className="text-red-600 text-sm py-2">
                {errors?.password?.type === "required"
                  ? "*Bạn chưa điền mật khẩu."
                  : errors?.password?.type === "maxLength"
                  ? "*Mật khẩu không được quá 40 ký tự"
                  : errors?.password?.type === "minLength"
                  ? "*Mật khẩu không được ít hơn 8 ký tự"
                  : ""}
              </p>
            </div>

            <div className="w-full">
              <Checkbox
                onChange={onChange}
                className="font-normal text-xs text-slate-500 gap-2"
              >
                Bằng cách tạo tài khoản hoặc đăng nhập, bạn hiểu và đồng ý với
                Điều khoản.
              </Checkbox>
            </div>
          </div>
          <div className="flex w-full mt-5">
            <button
              disabled={loadingEmailPassword}
              type="submit"
              className="bg-primary text-white px-4 py-2 w-full !hover:bg-primary rounded-lg flex gap-3 justify-center items-center hover:opacity-80 !transition-all"
            >
              {false ? (
                <Spin
                  indicator={
                    <LoadingOutlined style={{ color: "white" }} spin />
                  }
                />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
          <div className="flex py-1">
            <span className=" text-gray-500 text-xs mx-auto">Or</span>
          </div>
          <div className="flex w-full">
            <button
              disabled={loading}
              type="button"
              className={`bg-red-500 h-10 text-white px-4 py-2 w-full !hover:bg-red-500 rounded-lg flex gap-3 justify-center items-center hover:opacity-80 !transition-all`}
              onClick={() => login()}
            >
              {false ? (
                <>
                  <div className="w-full flex">
                    <span className="border-[3px] rounded-full m-auto border-l-transparent border-solid border-gray-100 w-[25px] h-[25px] animate-spin"></span>
                  </div>
                </>
              ) : (
                <>
                  <GoogleOutlined />
                  Đăng nhập với Google
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
