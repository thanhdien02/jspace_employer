import { DatePicker, Select } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HomeOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import ButtonLoading from "../../components/button/ButtonLoading";
import { formats, modules } from "../../utils/quill";
import IconGroupUser from "../../components/icons/IconGroupUser";
import {
  dataAddress,
  dataExperience,
  dataPosition,
  dataSkills,
  dataTimeWork,
} from "../../utils/dataFetch";
import IconLink from "../../components/icons/IconLink";
import IconMap from "../../components/icons/IconMap";
import IconAcademicCap from "../../components/icons/IconAcademicCap";
import IconClipboardDocument from "../../components/icons/IconClipboardDocument";
import IconClock from "../../components/icons/IconClock";
import IconMoney from "../../components/icons/IconMoney";
interface Inputs {
  titleJob?: string;
  salary?: number;
  address?: string;
  dateEnd?: string | string[];
  description?: string;
  quantitycandidates?: string;
  experience?: string;
  skills?: string | string[];
  rank?: string;
  timeWord?: string;
}
const EmployerPostJobPage: React.FC = () => {
  const [jobDescription] = useState("");
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataUpdateCompany: Inputs) => {
    console.log("🚀 ~ dataUpdateCompany:", dataUpdateCompany);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mx-40 my-10 bg-white px-8 py-5 rounded-lg shadow-md">
        <h2 className="font-bold text-lg my-2 text-gray-800">Đăng tin</h2>
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
                  {...register("titleJob", {
                    required: true,
                  })}
                  placeholder="Tên công việc"
                  type="text"
                  autoComplete="off"
                  id="name"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors.titleJob?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền tên công việc
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="grow-[1]">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mức lương <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMoney className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMoney>
                <input
                  {...register("salary", {
                    required: true,
                  })}
                  placeholder="Mức lương"
                  type="salary"
                  autoComplete="off"
                  id="salary"
                  className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors?.salary?.type == "required" ? (
                <p className="text-red-600 mt-1">*Bạn chưa điền mức lương</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/*  */}
          <div className="flex mt-5 gap-10">
            <div className="w-full">
              <label
                htmlFor="experience"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kinh nghiệm <span className="text-red-500">*</span>
              </label>

              <div className="mt-2 relative">
                <IconAcademicCap className="absolute z-10 top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconAcademicCap>
                <Select
                  {...register("experience", {
                    required: true,
                  })}
                  allowClear={true}
                  showSearch
                  placeholder="Kinh nghiệm"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => {
                    setValue("experience", e);
                    clearErrors("experience");
                  }}
                  options={dataExperience}
                />
                {errors?.experience?.type == "required" ? (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền kinh nghiệm
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="w-full">
              <label
                htmlFor="quantitycandidates"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Số lượng tuyển
              </label>
              <div className="relative mt-2">
                <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconGroupUser>
                <input
                  {...register("quantitycandidates", {
                    required: true,
                  })}
                  placeholder="Số lượng tuyển"
                  type="number"
                  autoComplete="off"
                  id="quantitycandidates"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors?.quantitycandidates?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền số lượng tuyển
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Vị trí <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconLink className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconLink>
                <Select
                  showSearch
                  placeholder="Vị trí"
                  allowClear={true}
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  {...register("rank", {
                    required: true,
                  })}
                  options={dataPosition}
                  onChange={(e) => {
                    setValue("rank", e);
                    clearErrors("rank");
                  }}
                />
              </div>
              {errors?.rank?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền vị trí công việc
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMap className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMap>
                <Select
                  {...register("address", {
                    required: true,
                  })}
                  showSearch
                  allowClear={true}
                  placeholder="Địa chỉ"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={dataAddress}
                  onChange={(e) => {
                    setValue("address", e);
                    clearErrors("address");
                  }}
                />
              </div>
              {errors?.address?.type == "required" ? (
                <p className="text-red-600 mt-1">*Bạn chưa điền địa chỉ</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="">
              <label
                htmlFor="timeWord"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thời gian làm việc <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconClock className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClock>
                <Select
                  {...register("timeWord", {
                    required: true,
                  })}
                  id="timeWord"
                  showSearch
                  allowClear={true}
                  placeholder="Thời gian làm việc"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={dataTimeWork}
                  onChange={(e) => {
                    setValue("timeWord", e);
                    clearErrors("timeWord");
                  }}
                />
              </div>
              {errors?.timeWord?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền thời gian làm việc
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Ngày kết thúc bài đăng <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <DatePicker
                  {...register("dateEnd", {
                    required: true,
                  })}
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={(value, valueString) => {
                    console.log("🚀 ~ value:", value);
                    setValue("dateEnd", valueString);
                    clearErrors("dateEnd");
                  }}
                  placeholder="Ngày kết thúc bài đăng"
                  className="h-11 w-full focus:border-solid focus:border-stone-400/70 border border-stone-200 border-solid"
                />
              </div>
              {errors?.dateEnd?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền ngày kết thúc
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="skills"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Kỹ năng <span className="text-red-500">*</span>
            </label>
            <div className="mt-2 relative">
              <IconClipboardDocument className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClipboardDocument>
              <Select
                mode="tags"
                {...register("skills", {
                  required: true,
                })}
                style={{ width: "100%" }}
                placeholder="Kỹ năng"
                className="skill select-custom min-h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 border border-stone-200 border-solid w-full rounded-md"
                options={dataSkills}
                allowClear
                onChange={(e) => {
                  console.log("🚀 ~ e:", e);
                  setValue("skills", e);
                  clearErrors("skills");
                }}
              />
            </div>
            {errors?.skills?.type == "required" ? (
              <p className="text-red-600 mt-1">*Bạn chưa điền kỹ năng</p>
            ) : (
              <></>
            )}
          </div>
          {/*  */}
          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mô tả công việc
            </label>
            <ReactQuill
              id="description"
              theme="snow"
              modules={modules}
              formats={formats}
              value={jobDescription}
              onChange={(content) => {
                setValue("description", content);
              }}
              className="mt-2"
            />
          </div>
          <div className="flex justify-end mt-10">
            <ButtonLoading
              title="Lưu thông tin"
              loading={false}
            ></ButtonLoading>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerPostJobPage;
