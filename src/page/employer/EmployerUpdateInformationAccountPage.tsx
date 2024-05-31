import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined, UserOutlined, CameraOutlined } from "@ant-design/icons";
import IconPhone from "../../components/icons/IconPhone";
import { employerUpdateInformationEmployer } from "../../store/employer/employer-slice";
import { Avatar, Select, Spin } from "antd";
import { dataPosition } from "../../utils/dataFetch";
import ButtonLoading from "../../components/button/ButtonLoading";
import IconGroupUser from "../../components/icons/IconGroupUser";
import InputNumber from "../../components/input/InputNumber";
import EmployerChangeAccountAvatarPage from "./EmployerChangeAccountAvatarPage";
import EmpoyerChangeAccountBackgroundPage from "./EmpoyerChangeAccountBackgroundPage";
interface Inputs {
  name: string;
  phone: string;
  email: string;
  id: string;
}
const EmployerUpdateInformationAccountPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { loadingEmployer } = useSelector((state: any) => state.employer);
  const dispatch = useDispatch();
  const [employerLogo, setEmployerLogo] = useState("");
  const [checkChangeAvatar, setCheckChangeAvatar] = useState(false);
  const [checkChangeBackground, setCheckChangeBackground] = useState(false);
  const [employerBackground, setEmployerBackground] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataUpdateEmployer: Inputs) => {
    dispatch(employerUpdateInformationEmployer(dataUpdateEmployer));
  };

  useEffect(() => {
    setValue("name", user?.name, { shouldValidate: true });
    setValue("phone", user?.phone, { shouldValidate: true });
    setValue("email", user?.email, { shouldValidate: true });
    setValue("id", user?.id, { shouldValidate: true });
    setEmployerLogo(user?.picture);
    setEmployerBackground(user?.background);
  }, [user]);

  useEffect(() => {
    document.title = "Chi tiết tài khoản";
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="mx-10 xl:mx-60 p-5 my-5 mt-10 shadow-md rounded-lg bg-white">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="py-3">
          <h2 className="font-bold text-lg my-3 text-gray-800 mb-5">
            Cài đặt thông tin cá nhân
          </h2>
          <div className="flex relative pt-5 h-[200px] justify-center">
            <div className="absolute inset-0 bottom-8 bg-blue-100">
              <>
                <div
                  onClick={() =>
                    setCheckChangeBackground(!checkChangeBackground)
                  }
                  className="absolute top-2 cursor-pointer left-2 px-2 py-1 rounded-md bg-slate-100 hover:opacity-90 hover:text-primary transition-all"
                >
                  <span className="">Đổi ảnh bìa</span>
                </div>

                {loadingEmployer ? (
                  <div className="flex bg-gray-200 h-full w-full">
                    <Spin className="m-auto" />
                  </div>
                ) : (
                  <img
                    src={
                      employerBackground
                        ? employerBackground
                        : "https://biz.prlog.org/jspace/logo.png"
                    }
                    alt=""
                    className={`w-full h-full ${
                      employerBackground ? "object-cover" : "object-contain"
                    }`}
                  />
                )}
              </>
            </div>
            <div className="flex justify-center self-end ">
              <div
                className="relative inline-block"
                onClick={() => {
                  setCheckChangeAvatar(!checkChangeAvatar);
                }}
              >
                {!loadingEmployer ? (
                  <div>
                    {user?.picture ? (
                      <>
                        <img
                          src={employerLogo}
                          alt=""
                          className="w-[80px] h-[80px] rounded-full cursor-pointer object-cover"
                        />
                        <CameraOutlined
                          className="absolute bottom-2 right-0 bg-blue-50 p-2 rounded-full cursor-pointer"
                          style={{ fontSize: "18px" }}
                        />
                      </>
                    ) : (
                      <div className="bg-white rounded-full">
                        <Avatar
                          className="mx-auto "
                          size={80}
                          icon={<UserOutlined />}
                        />
                        <CameraOutlined
                          className="absolute bottom-2 right-0 bg-blue-50 p-2 rounded-full cursor-pointer"
                          style={{ fontSize: "18px" }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-[80px] h-[80px] rounded-full flex bg-white">
                    <Spin className="m-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <h4 className="text-center font-semibold text-base">Ảnh đại diện</h4>
          <div className="flex gap-10 mt-6">
            <div className="grow-[1]">
              <label
                htmlFor="namecompany"
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
                    transform: "translate(65%, 65%)",
                  }}
                />
                <input
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="Tài khoản"
                  type="text"
                  autoComplete="off"
                  id="name"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors?.name?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền tên tài khoản
                </p>
              ) : (
                <></>
              )}
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
                    transform: "translate(65%, 65%)",
                  }}
                />
                <input
                  disabled={true}
                  {...register("email", {
                    required: true,
                  })}
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                  id="email"
                  className="h-full cursor-not-allowed focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex mt-5 gap-10">
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Số điện thoại
              </label>
              <div className="mt-2 relative">
                <IconPhone className="absolute top-0 left-0 translate-x-[50%] translate-y-[45%] text-gray-400"></IconPhone>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <InputNumber
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Số điện thoại"
                    />
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Vị trí
              </label>
              <div className="relative">
                <Select
                  defaultValue="Nhân viên"
                  className="edit-select-custom h-11 mt-2 !w-full block hover:!border-gray-400"
                  allowClear
                  options={dataPosition}
                  placeholder="Vị trí"
                />
                <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[45%] text-gray-400"></IconGroupUser>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <ButtonLoading
              title="Lưu thông tin"
              loading={loadingEmployer}
            ></ButtonLoading>
          </div>
        </form>
      </div>

      {/* change image */}
      {checkChangeAvatar && (
        <EmployerChangeAccountAvatarPage
          onClick={setCheckChangeAvatar}
        ></EmployerChangeAccountAvatarPage>
      )}
      {checkChangeBackground && (
        <EmpoyerChangeAccountBackgroundPage
          onClick={setCheckChangeBackground}
        ></EmpoyerChangeAccountBackgroundPage>
      )}
    </>
  );
};

export default EmployerUpdateInformationAccountPage;
