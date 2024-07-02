import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MailOutlined, HomeOutlined, CameraOutlined } from "@ant-design/icons";
import ButtonLoading from "../../components/button/ButtonLoading";
import { message, Select, Skeleton, Spin, Upload, UploadProps } from "antd";
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
  companyUpdateBackgroundCompany,
  companyUpdateLogoCompany,
} from "../../store/company/company-slice";
import { useParams } from "react-router-dom";
import { employerConfirmCompanyEmployer } from "../../store/employer/employer-slice";
import {
  fileUpdateMessageRedux,
  fileUploadImage,
} from "../../store/file/file-slice";
interface Inputs {
  name: string;
  phone: number;
  email: string;
  address: string;
  description: string;
  companySize: string;
  companyLink: string;
  logo?: string;
  background?: string;
}
const EmployerUpdateInformationCompanyPage: React.FC = () => {
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { loadingFile, messageFile, files } = useSelector(
    (state: any) => state.file
  );
  const { loadingCompany, company } = useSelector(
    (state: any) => state.company
  );
  const [disableAll, setDisableAll] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyBackground, setCompanyBackground] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
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
  const propsBackground: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (companyId === undefined) {
        dispatch(fileUploadImage({ file: info.file, message: "background" }));
      } else {
        dispatch(
          companyUpdateBackgroundCompany({
            file: info.file,
            company_id: companyAuth?.id,
          })
        );
      }
    },
    customRequest: () => {},
  };
  const propsLogo: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (companyId === undefined) {
        dispatch(fileUploadImage({ file: info.file, message: "logo" }));
      } else {
        dispatch(
          companyUpdateLogoCompany({
            file: info.file,
            company_id: companyAuth?.id,
          })
        );
      }
    },
    customRequest: () => {},
  };

  useEffect(() => {
    if (companyId !== undefined && companyId === "updatecompany") {
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
      setValue("companySize", companyAuth?.companySize);
      setCompanySize(companyAuth?.companySize);
      setCompanyDescription(companyAuth?.description);
      setCompanyLogo(companyAuth?.logo);
      setCompanyBackground(companyAuth?.background);
    } else {
      dispatch(companyGetCompanyById({ companyId: companyId }));
    }
    window.scrollTo(0, 0);
  }, [companyAuth]);

  useEffect(() => {
    if (messageFile == "logo") {
      setCompanyLogo(files?.filePath);
      setValue("logo", files?.filePath);
    } else if (messageFile == "background") {
      setCompanyBackground(files?.filePath);
      setValue("background", files?.filePath);
    }
    if (messageFile != "") {
      dispatch(fileUpdateMessageRedux({ messageFile: "" }));
    }
  }, [files]);
  useEffect(() => {
    if (companyId && companyId !== "updatecompany") {
      setValue("name", company?.company?.name, { shouldValidate: true });
      setValue("phone", company?.company?.phone, { shouldValidate: true });
      setValue("email", company?.company?.email, { shouldValidate: true });
      setValue("address", company?.company?.address, { shouldValidate: true });
      setValue("companyLink", company?.company?.companyLink, {
        shouldValidate: true,
      });
      setValue("description", company?.company?.description, {
        shouldValidate: true,
      });
      setValue("companySize", company?.company?.companySize);
      setCompanySize(company?.company?.companySize);
      setCompanyDescription(company?.company?.description);
      setCompanyLogo(company?.company?.logo);
      setCompanyBackground(company?.company?.background);

      setDisableAll(true);
    }
  }, [company]);

  return (
    <>
      <div className="xl:mx-40 mx-10 my-10 bg-white px-8 py-5  rounded-lg shadow-md">
        <div>
          <h2 className="font-bold text-lg my-3 text-gray-800 mb-5">
            Cập nhật thông tin công ty
          </h2>
        </div>
        <div className="flex relative pt-5 h-[200px] justify-center">
          <div className="absolute inset-0 bottom-8">
            <>
              <Upload
                disabled={disableAll}
                {...propsBackground}
                className="absolute top-2 left-2 cursor-pointer px-2 py-1 rounded-md bg-slate-100 hover:opacity-90 hover:text-primary transition-all"
              >
                <span className="">Chọn ảnh bìa</span>
              </Upload>

              {loadingCompany || loadingFile ? (
                <div className="flex bg-gray-200 h-full w-full">
                  <Spin className="m-auto" />
                </div>
              ) : (
                <img
                  src={
                    companyBackground
                      ? companyBackground
                      : "https://biz.prlog.org/jspace/logo.png"
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </>
          </div>
          <div className="flex justify-center self-end ">
            <Upload
              disabled={disableAll}
              {...propsLogo}
              className="relative inline-block"
            >
              {loadingCompany || loadingFile ? (
                <div className="w-[75px] h-[75px] rounded-full flex bg-white">
                  <Spin className="m-auto" />
                </div>
              ) : (
                <img
                  src={
                    companyLogo
                      ? companyLogo
                      : "https://biz.prlog.org/jspace/logo.png"
                  }
                  alt=""
                  className="w-[75px] h-[75px] object-cover rounded-full cursor-pointer bg-white"
                />
              )}
              {loadingCompany || loadingFile ? (
                ""
              ) : (
                <CameraOutlined
                  className="absolute bottom-2 right-0 bg-blue-50 p-2 rounded-full cursor-pointer"
                  style={{ fontSize: "18px" }}
                />
              )}
            </Upload>
          </div>
        </div>
        <h4 className="text-center font-semibold text-base">Logo công ty</h4>
        {!loadingCompany ? (
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
                    disabled={disableAll}
                    placeholder="Tên công ty"
                    type="text"
                    autoComplete="off"
                    id="name"
                    className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                  />
                </div>
                {errors?.name?.type == "required" ? (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền tên công ty
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
                    disabled={
                      (companyId !== undefined &&
                        companyId === "updatecompany") ||
                      disableAll
                    }
                    {...register("email", {
                      required: true,
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Trường yêu cầu email",
                      },
                    })}
                    placeholder="Email"
                    type="email"
                    autoComplete="off"
                    id="email"
                    className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  />
                </div>
                <p className="text-red-500 mt-1">
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
                    disabled={disableAll}
                    placeholder="Số điện thoại"
                    type="number"
                    id="phone"
                    autoComplete="off"
                    className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-12 py-3 border border-stone-200 border-solid w-full rounded-md"
                  />
                </div>
                <p className="text-red-500 mt-1">
                  {" "}
                  {errors?.phone?.type == "required"
                    ? "*Bạn chưa điền số điện thoại."
                    : ""}
                </p>
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
                    {...register("companySize", {
                      required: true,
                    })}
                    disabled={disableAll}
                    placeholder="Số lượng nhân viên"
                    className="edit-select-custom h-11 mt-2 !w-full"
                    allowClear
                    value={companySize}
                    onChange={(e) => {
                      setValue("companySize", e);
                      setCompanySize(e);
                      clearErrors("companySize");
                    }}
                    options={dataScale}
                  />
                  <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[75%] text-gray-400"></IconGroupUser>
                </div>
                <p className="text-red-500 mt-1">
                  {" "}
                  {errors?.companySize?.type == "required"
                    ? "*Bạn chưa điền quy mô công ty."
                    : ""}
                </p>
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
                    disabled={disableAll}
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
                    disabled={disableAll}
                    placeholder="Địa chỉ"
                    type="text"
                    autoComplete="off"
                    id="address"
                    className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  />
                </div>
                <p className="text-red-500 mt-1">
                  {" "}
                  {errors?.address?.type == "required"
                    ? "*Bạn chưa điền địa chỉ công ty."
                    : ""}
                </p>
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
                readOnly={disableAll}
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
        ) : (
          <>
            <div>
              <Skeleton className="h-[300px]"></Skeleton>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployerUpdateInformationCompanyPage;
