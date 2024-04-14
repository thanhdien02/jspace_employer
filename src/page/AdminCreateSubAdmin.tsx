import React, { useEffect, useState } from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import IconKey from "../components/icons/IconKey";
import { useDispatch, useSelector } from "react-redux";
import { authFetchMe } from "../store/auth/auth-slice";
import Input from "../components/input";
import {
  adminCreateSubAdmin,
  adminUploadMessageRedux,
} from "../store/admin/admin-slice";
import IconClose from "../components/icons/IconClose";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

interface Inputs {
  username: string;
  password: string;
  email: string;
}
const AdminCreateSubAdmin: React.FC = () => {
  const { accessToken, message } = useSelector((state: any) => state.auth);
  const { loading, messageAdmin } = useSelector((state: any) => state.admin);
  const [checkNotifications, setCheckNotifications] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataCreateSubAdmin: Inputs) => {
    dispatch(adminCreateSubAdmin(dataCreateSubAdmin));
  };

  //Load information user
  useEffect(() => {
    if (accessToken == "") {
      const token = getToken();
      if (token?.accessToken == "null") {
        navigate("/login");
      } else if (message == "unauthenticated") {
        navigate("/login");
      }
      dispatch(authFetchMe());
    }
  }, [message, accessToken]);
  useEffect(() => {
    if (messageAdmin == "success") {
      setCheckNotifications("success");
      dispatch(adminUploadMessageRedux({ messageAdmin: "" }));
    } else if (messageAdmin == "fail") {
      setCheckNotifications("fail");
      dispatch(adminUploadMessageRedux({ messageAdmin: "" }));
    }
  }, [messageAdmin]);

  return (
    <>
      <div className="mx-52 bg-white my-10 rounded-lg">
        <div>
          {" "}
          <h2 className="font-bold text-2xl p-5 text-blue-700">Add SubAdmin</h2>
        </div>
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="px-10 py-5"
        >
          <div className="flex gap-10">
            <div className="grow-[1]">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên tài khoản
              </label>
              <div className="mt-2 relative">
                <UserOutlined
                  style={{
                    fontSize: "20px",
                    color: "rgb(156 163 175)",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(60%, 60%)",
                  }}
                />
                <input
                  {...register("username", {
                    required: true,
                    maxLength: 40,
                    minLength: 5,
                  })}
                  placeholder="Tài khoản"
                  type="text"
                  autoComplete="off"
                  id="username"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
                <p className="text-red-500 py-2">
                  {" "}
                  {errors?.username?.type === "required"
                    ? "*Bạn chưa điền thông tin tài khoản."
                    : errors?.username?.type === "maxLength"
                    ? "*Tài khoản không được quá 40 ký tự"
                    : errors?.username?.type === "minLength"
                    ? "*Tài khoản không được ít hơn 5 ký tự"
                    : ""}
                </p>
              </div>
            </div>
            <div className="grow-[1]">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ Email
              </label>
              <div className="mt-2 relative">
                <MailOutlined
                  style={{
                    fontSize: "20px",
                    color: "rgb(156 163 175)",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(60%, 60%)",
                  }}
                />
                <input
                  {...register("email", {
                    required: true,
                    maxLength: 40,
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Trường yêu cầu email",
                    },
                  })}
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                  id="email"
                  className="h-full  focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                />
                <p className="text-red-500 py-2">
                  {" "}
                  {errors?.email?.type === "required"
                    ? "*Bạn chưa điền Email."
                    : errors?.email?.type === "maxLength"
                    ? "*Email không được quá 40 ký tự"
                    : errors?.email?.type === "pattern"
                    ? "*Trường yêu cầu email"
                    : ""}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mật khẩu
            </label>
            <div className="mt-2 relative">
              <IconKey className="absolute top-0 left-0 translate-x-[50%] text-gray-400 translate-y-[50%]"></IconKey>
              <input
                {...register("password", {
                  required: true,
                  maxLength: 40,
                  minLength: 8,
                })}
                placeholder="Mật khẩu"
                type="password"
                id="password"
                autoComplete="off"
                className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-12 py-3 border border-stone-200 border-solid w-full rounded-md"
              />
              <p className="text-red-500 py-2">
                {" "}
                {errors?.password?.type === "required"
                  ? "*Bạn chưa điền mật khẩu."
                  : errors?.password?.type === "maxLength"
                  ? "*Mật khẩu không được quá 40 ký tự"
                  : errors?.password?.type === "minLength"
                  ? "*Mật khẩu không được ít hơn 8 ký tự"
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex justify-between mb-2">
            <div className="self-end">
              {checkNotifications === "success" ? (
                <p className="flex items-center text-green-400 gap-5 border border-solid border-green-200 w-fit pl-2 rounded-lg hover:border-green-500 transition-all hover:opacity-80 font-semibold text-base">
                  <span className="py-1"> *Tạo tài khoản thành công</span>
                  <IconClose
                    actionClose={setCheckNotifications}
                    className="cursor-pointer h-full w-fit hover:bg-green-300 hover:text-white px-2 mr- py-2 rounded-lg transition-all"
                  ></IconClose>
                </p>
              ) : checkNotifications === "fail" ? (
                <p className="flex items-center text-red-400 gap-5 border border-solid border-red-200 w-fit pl-2 rounded-lg hover:border-red-500 transition-all hover:opacity-80 font-semibold text-base">
                  <span className="py-1"> *Tạo tài khoản thất bại</span>
                  <IconClose
                    actionClose={setCheckNotifications}
                    className="cursor-pointer h-full w-fit hover:bg-red-300 hover:text-white px-2 mr- py-2 rounded-lg transition-all"
                  ></IconClose>
                </p>
              ) : (
                ""
              )}
            </div>
            <Input
              className="mt-5"
              title="Tạo SubAdmin"
              loading={loading}
            ></Input>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminCreateSubAdmin;
