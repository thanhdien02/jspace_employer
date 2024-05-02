import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MailOutlined, UserOutlined, CameraOutlined } from "@ant-design/icons";
import IconPhone from "../../components/icons/IconPhone";
import { employerUpdateInformationEmployer } from "../../store/employer/employer-slice";
import { message, Select, Spin, Upload, UploadProps } from "antd";
import { dataPosition } from "../../utils/dataFetch";
import ButtonLoading from "../../components/button/ButtonLoading";
import IconGroupUser from "../../components/icons/IconGroupUser";
interface Inputs {
  name: string;
  phone: number;
  email: string;
  id: string;
}
const EmployerUpdateInformationAccountPage: React.FC = () => {
  const { accessToken, user } = useSelector((state: any) => state.auth);
  const { loadingEmployer } = useSelector((state: any) => state.employer);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
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
  }, [accessToken]);

  useEffect(() => {
    document.title = "Chi tiết tài khoản";
    window.scrollTo(0, 0);
  }, []);
  const props: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
  return (
    <>
      <div className="lg:mx-60 p-5 my-5 mt-10 shadow-md rounded-lg bg-white">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="py-3">
          <h2 className="font-bold text-lg my-3 text-gray-800 mb-5">
            Cài đặt thông tin cá nhân
          </h2>
          <div className="flex justify-center pt-5">
            <Upload {...props} className="relative inline-block">
              {user?.picture ? (
                <img
                  src={user?.picture}
                  alt=""
                  className="w-[75px] h-[75px] rounded-full cursor-pointer"
                />
              ) : (
                <div className="w-[75px] h-[75px] rounded-full flex">
                  <Spin className="m-auto" />
                </div>
              )}
              {user?.picture ? (
                <CameraOutlined
                  className="absolute bottom-2 right-0 bg-blue-50 p-2 rounded-full cursor-pointer"
                  style={{ fontSize: "18px" }}
                />
              ) : (
                ""
              )}
            </Upload>
          </div>
          <h4 className="text-center font-semibold text-base">Ảnh đại diện</h4>
          <div className="flex gap-10 mt-6">
            <div className="grow-[1]">
              <label
                htmlFor="namecompany"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên công ty
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
                <p className="text-red-500 py-2">
                  {" "}
                  {errors?.name?.type === "required"
                    ? "*Bạn chưa điền thông tin tài khoản."
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
                  className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
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
                <input
                  {...register("phone", {})}
                  placeholder="Số điện thoại"
                  type="number"
                  id="phone"
                  autoComplete="off"
                  className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-12 py-3 border border-stone-200 border-solid w-full rounded-md"
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
                  className="h-11 mt-2 !w-full block hover:!border-gray-400"
                  allowClear
                  options={dataPosition}
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
    </>
  );
};

export default EmployerUpdateInformationAccountPage;
