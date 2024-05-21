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
  dataEnterSalary,
  dataExperience,
  dataGender,
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
import IconCog from "../../components/icons/IconCog";
interface Inputs {
  title?: string;
  salary?: number;
  location?: string;
  closeDate?: string | string[];
  description?: string;
  quantity?: string;
  experience?: string;
  skills?: string | string[];
  rank?: string;
  jobType?: string;
  gender?: string;
}
const EmployerPostJobPage: React.FC = () => {
  const [jobDescription] = useState("");
  const [selectEnterSalary, setSelectEnterSalary] = useState("");
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
      <div className="xl:mx-40 mx-10 my-10 bg-white px-8 py-5 rounded-lg shadow-md">
        <h2 className="font-bold text-lg my-2 text-gray-800">Đăng tin</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="py-5">
          <div className="grid grid-cols-2 gap-10">
            <div className="">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tên công việc <span className="text-red-500">*</span>
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
                  {...register("title", {
                    required: true,
                  })}
                  placeholder="Tên công việc"
                  type="text"
                  autoComplete="off"
                  id="name"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors.title?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền tên công việc
                </p>
              ) : (
                <></>
              )}
            </div>
            <div className="">
              <label
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mức lương <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMoney className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMoney>
                <Select
                  {...register("salary", {
                    required: true,
                  })}
                  allowClear={true}
                  placeholder="Kinh nghiệm"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => {
                    // setValue("salary", e);
                    // clearErrors("salary");
                    setSelectEnterSalary(e);
                  }}
                  options={dataEnterSalary}
                />
                {selectEnterSalary == "fix" ? (
                  <div className="flex">
                    <input
                      {...register("salary", {
                        required: true,
                      })}
                      placeholder="Mức lương"
                      type="number"
                      autoComplete="off"
                      id="salary"
                      className="h-full mt-5 focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-3 border border-stone-200 border-solid w-full rounded-md"
                    />
                  </div>
                ) : selectEnterSalary == "between" ? (
                  <div className="grid grid-cols-2 mt-5 gap-5">
                    <input
                      {...register("salary", {
                        required: true,
                      })}
                      placeholder="Từ"
                      type="number"
                      autoComplete="off"
                      id="salary"
                      className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-3 border border-stone-200 border-solid w-full rounded-md"
                    />
                    <input
                      placeholder="Đến"
                      type="number"
                      autoComplete="off"
                      id="salary"
                      className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-3 border border-stone-200 border-solid w-full rounded-md"
                    />
                  </div>
                ) : selectEnterSalary == "up" ? (
                  <div className="mt-5">
                    <input
                      {...register("salary", {
                        required: true,
                      })}
                      placeholder="Lên đến"
                      type="number"
                      autoComplete="off"
                      id="salary"
                      className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-3 border border-stone-200 border-solid w-full rounded-md"
                    />
                  </div>
                ) : selectEnterSalary == "more" ? (
                  <div className="mt-5">
                    <input
                      {...register("salary", {
                        required: true,
                      })}
                      placeholder="Trên"
                      type="number"
                      autoComplete="off"
                      id="salary"
                      className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-3 border border-stone-200 border-solid w-full rounded-md"
                    />
                  </div>
                ) : (
                  <></>
                )}
                {/* <input
                  {...register("salary", {
                    required: true,
                  })}
                  placeholder="Mức lương"
                  type="salary"
                  autoComplete="off"
                  id="salary"
                  className="h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                /> */}
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
                Số lượng tuyển <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-2">
                <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconGroupUser>
                <input
                  {...register("quantity", {
                    required: true,
                  })}
                  placeholder="Số lượng tuyển"
                  type="number"
                  autoComplete="off"
                  id="quantity"
                  className="h-full pl-12 pr-4 focus:border-solid focus:border-stone-400/70 transition-all outline-none py-3 border border-stone-200 border-solid w-full rounded-md"
                />
              </div>
              {errors?.quantity?.type == "required" ? (
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
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMap className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMap>
                <Select
                  {...register("location", {
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
                    setValue("location", e);
                    clearErrors("location");
                  }}
                />
              </div>
              {errors?.location?.type == "required" ? (
                <p className="text-red-600 mt-1">*Bạn chưa điền địa chỉ</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="">
              <label
                htmlFor="jobType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thời gian làm việc <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconClock className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClock>
                <Select
                  {...register("jobType", {
                    required: true,
                  })}
                  id="jobType"
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
                    setValue("jobType", e);
                    clearErrors("jobType");
                  }}
                />
              </div>
              {errors?.jobType?.type == "required" ? (
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
                  {...register("closeDate", {
                    required: true,
                  })}
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  onChange={(value, valueString) => {
                    console.log("🚀 ~ value:", value);
                    setValue("closeDate", valueString);
                    clearErrors("closeDate");
                  }}
                  placeholder="Ngày kết thúc bài đăng"
                  className="h-11 w-full focus:border-solid focus:border-stone-400/70 border border-stone-200 border-solid"
                />
              </div>
              {errors?.closeDate?.type == "required" ? (
                <p className="text-red-600 mt-1">
                  *Bạn chưa điền ngày kết thúc
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="">
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
            <div className="">
              <label
                htmlFor="gender"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Giới tính <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconCog className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconCog>
                <Select
                  {...register("gender", {
                    required: true,
                  })}
                  id="gender"
                  showSearch
                  allowClear={true}
                  placeholder="Giới tính"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={dataGender}
                  onChange={(e) => {
                    setValue("gender", e);
                    clearErrors("gender");
                  }}
                />
              </div>
              {errors?.gender?.type == "required" ? (
                <p className="text-red-600 mt-1">*Bạn chưa điền giới tính</p>
              ) : (
                <></>
              )}
            </div>
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
