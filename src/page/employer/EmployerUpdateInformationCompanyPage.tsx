import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MailOutlined, HomeOutlined, CameraOutlined } from "@ant-design/icons";
import ButtonLoading from "../../components/button/ButtonLoading";
import { message, Select, Spin, Upload, UploadProps } from "antd";
import { dataScale } from "../../utils/dataFetch";
import IconPhone from "../../components/icons/IconPhone";
import { useDispatch, useSelector } from "react-redux";
import IconMap from "../../components/icons/IconMap";
import IconLink from "../../components/icons/IconLink";
import IconGroupUser from "../../components/icons/IconGroupUser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats, modules } from "../../utils/quill";
import {
  companyCreateCompany,
  companyGetCompanyById,
} from "../../store/company/company-slice";
import { useParams } from "react-router-dom";
import bg from "../../assets/bg-login.jpg";
import { employerConfirmCompanyEmployer } from "../../store/employer/employer-slice";
interface Inputs {
  name: string;
  phone: number;
  email: string;
  address: string;
  description: string;
  companySize: string;
  companyLink: string;
}
const EmployerUpdateInformationCompanyPage: React.FC = () => {
  const { user, companyAuth } = useSelector((state: any) => state.auth);
  const { loadingCompany, company } = useSelector(
    (state: any) => state.company
  );
  const [companySize, setCompanySize] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {},
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataUpdateCompany: Inputs) => {
    console.log("🚀 ~ dataUpdateCompany:", dataUpdateCompany);
    if (companyId === "updatecompany") {
      // cập nhật
    } else if (companyId === undefined) {
      dispatch(companyCreateCompany(dataUpdateCompany));
    } else {
      dispatch(employerConfirmCompanyEmployer({ company_id: companyId }));
    }
  };
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

  useEffect(() => {
    if (companyId !== undefined && companyId === "updatecompany") {
      console.log("123");
      setValue("name", companyAuth?.name, { shouldValidate: true });
      setValue("phone", companyAuth?.phone, { shouldValidate: true });
      setValue("email", companyAuth?.email, { shouldValidate: true });
      setValue("address", companyAuth?.address, { shouldValidate: true });
      setValue("companyLink", companyAuth?.companyLink, {
        shouldValidate: true,
      });
      setValue("description", companyAuth?.description, {
        shouldValidate: true,
      });
      setCompanySize(companyAuth?.companySize);
      setCompanyDescription(companyAuth?.description);
    } else {
      dispatch(companyGetCompanyById({ companyId: companyId }));
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (companyId && companyId !== "updatecompany") {
      setValue("name", company?.name, { shouldValidate: true });
      setValue("phone", company?.phone, { shouldValidate: true });
      setValue("email", company?.email, { shouldValidate: true });
      setValue("address", company?.address, { shouldValidate: true });
      setValue("companyLink", company?.companyLink, {
        shouldValidate: true,
      });
      setValue("description", company?.description, {
        shouldValidate: true,
      });
      setCompanySize(company?.companySize);
      setCompanyDescription(company?.description);
    }
  }, [company]);

  return (
    <>
      <div className="mx-40 my-10 bg-white px-8 py-5  rounded-lg shadow-md">
        <div>
          <h2 className="font-bold text-lg my-3 text-gray-800 mb-5">
            Cập nhật thông tin công ty
          </h2>
        </div>
        <div className="flex relative pt-5 h-[200px] justify-center">
          <div className="absolute inset-0 bottom-8">
            <>
              <Upload
                {...props}
                className="absolute top-2 left-2 px-2 py-1 rounded-md bg-slate-100 hover:opacity-90 hover:text-primary transition-all"
              >
                <button className="">Chọn ảnh bìa</button>
              </Upload>

              <img src={bg} alt="" className="w-full h-full object-cover" />
            </>
          </div>
          <div className="flex justify-center self-end ">
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
        </div>
        <h4 className="text-center font-semibold text-base">Logo công ty</h4>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="py-5">
          <div className="flex gap-10">
            <div className="grow-[1]">
              <label
                htmlFor="companyname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên công ty <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <HomeOutlined
                  style={{
                    fontSize: "20px",
                    color: "rgb(156 163 175)",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(65%, 60%)",
                  }}
                />
                <input
                  {...register("name", {
                    required: true,
                  })}
                  placeholder="Tên công ty"
                  type="text"
                  autoComplete="off"
                  id="name"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
            </div>
            <div className="grow-[1]">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email công ty <span className="text-red-500">*</span>
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
          {/*  */}
          <div className="flex mt-5 gap-10">
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconPhone className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconPhone>
                <input
                  {...register("phone", { required: true })}
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
                Quy mô
              </label>
              <div className="relative">
                <Select
                  // defaultValue="1-9 nhân viên"
                  placeholder="Số lượng nhân viên"
                  className="h-11 mt-2 !w-full"
                  allowClear
                  value={companySize}
                  onChange={(e) => {
                    // setValue("scale", e);
                    setCompanySize(e);
                  }}
                  options={dataScale}
                />
                <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[75%] text-gray-400"></IconGroupUser>
              </div>
            </div>
          </div>
          <div className="flex gap-10 mt-5">
            <div className="grow-[1]">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Website
              </label>
              <div className="mt-2 relative">
                <IconLink className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconLink>
                <input
                  {...register("companyLink", {})}
                  placeholder="http://"
                  type="text"
                  autoComplete="off"
                  id="website"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
            </div>
            <div className="grow-[1]">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMap className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMap>
                <input
                  {...register("address", {
                    required: true,
                  })}
                  placeholder="Địa chỉ"
                  type="text"
                  autoComplete="off"
                  id="address"
                  className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
            </div>
          </div>
          {/*  */}
          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mô tả công ty
            </label>
            <ReactQuill
              id="description"
              theme="snow"
              modules={modules}
              formats={formats}
              value={companyDescription}
              onChange={(content) => {
                setValue("description", content);
              }}
              className="mt-2"
            />
          </div>
          <div className="flex justify-end mt-10">
            <ButtonLoading
              title="Lưu thông tin"
              loading={loadingCompany}
            ></ButtonLoading>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerUpdateInformationCompanyPage;
