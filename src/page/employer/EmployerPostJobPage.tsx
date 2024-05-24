import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { HomeOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import ButtonLoading from "../../components/button/ButtonLoading";
import { formats, modules } from "../../utils/quill";
import IconGroupUser from "../../components/icons/IconGroupUser";
import { dataEnterSalary } from "../../utils/dataFetch";
import IconLink from "../../components/icons/IconLink";
import IconMap from "../../components/icons/IconMap";
import IconAcademicCap from "../../components/icons/IconAcademicCap";
import IconClipboardDocument from "../../components/icons/IconClipboardDocument";
import IconClock from "../../components/icons/IconClock";
import IconMoney from "../../components/icons/IconMoney";
import IconCog from "../../components/icons/IconCog";
import { useDispatch, useSelector } from "react-redux";
import {
  commonGetExperience,
  commonGetGender,
  commonGetJobType,
  commonGetLocation,
  commonGetRank,
  commonGetSkills,
} from "../../store/common/common-slice";
import { jobPostJob } from "../../store/job/job-slice";
import VNCurrencyInput from "../../components/input/InputMoney";
interface Inputs {
  title?: string;
  minPay: string;
  maxPay: string;
  location?: string;
  description?: string;
  quantity?: string;
  experience?: string;
  skillIdList?: string | string[];
  newSkills?: string | string[];
  rank?: string;
  jobType?: string;
  gender?: string;
}
const EmployerPostJobPage: React.FC = () => {
  const { locations, ranks, jobTypes, experiences, genders, skills } =
    useSelector((state: any) => state.common);
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { loadingJob } = useSelector((state: any) => state.job);
  const dispatch = useDispatch();
  const [jobDescription, setJobDescription] = useState("");
  const [selectEnterSalary, setSelectEnterSalary] = useState("");
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataPosJob: Inputs) => {
    if (dataPosJob?.minPay === undefined) {
      let minPay = "0";
      setValue("minPay", minPay);
      console.log("🚀 ~ dataPosJob:", {
        ...dataPosJob,
        minPay,
        companyId: companyAuth?.id,
        useTrialPost: true,
        purchasedProductId: null,
      });
      dispatch(
        jobPostJob({
          ...dataPosJob,
          companyId: companyAuth?.id,
          useTrialPost: true,
          purchasedProductId: null,
          newSkills: [],
        })
      );
    } else if (dataPosJob?.maxPay === undefined) {
      let maxPay = "9007199254740992";
      setValue("maxPay", maxPay);
      console.log("🚀 ~ dataPosJob:", {
        ...dataPosJob,
        maxPay,
        companyId: companyAuth?.id,
        useTrialPost: true,
        purchasedProductId: null,
      });
      dispatch(
        jobPostJob({
          ...dataPosJob,
          companyId: companyAuth?.id,
          useTrialPost: true,
          purchasedProductId: null,
          newSkills: [],
        })
      );
    } else {
      console.log("🚀 ~ dataPosJob123456789:", {
        ...dataPosJob,
        companyId: companyAuth?.id,
        useTrialPost: true,
        purchasedProductId: null,
        newSkills: [],
      });
      dispatch(
        jobPostJob({
          ...dataPosJob,
          companyId: companyAuth?.id,
          useTrialPost: true,
          purchasedProductId: null,
          newSkills: [],
        })
      );
    }
    reset();
    setJobDescription("");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(commonGetLocation());
    dispatch(commonGetJobType());
    dispatch(commonGetGender());
    dispatch(commonGetRank());
    dispatch(commonGetExperience());
    dispatch(commonGetSkills());
  }, []);

  return (
    <>
      <div className="xl:mx-40 mx-10 my-10 bg-white px-8 py-5 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-10 items-center">
          <h2 className="font-bold text-lg my-2 text-gray-800">Đăng tin</h2>
        </div>
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
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gói bài đăng
              </label>
              <Select
                allowClear={true}
                placeholder="Lựa chọn đăng bài"
                className="select-custom mt-2 h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                onChange={() => {}}
                options={[
                  { key: "1", value: "Trial" },
                  { key: "2", value: "Max Pro" },
                ]}
              />
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
                  fieldNames={{ label: "code", value: "value" }}
                  placeholder="Kinh nghiệm"
                  value={getValues("experience")}
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => {
                    setValue("experience", e);
                    clearErrors("experience");
                  }}
                  options={experiences}
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
                  type="text"
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
                  value={getValues("rank")}
                  fieldNames={{ label: "code", value: "value" }}
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  {...register("rank", {
                    required: true,
                  })}
                  options={ranks}
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
                  value={getValues("location")}
                  fieldNames={{ label: "province", value: "value" }}
                  allowClear={true}
                  placeholder="Địa chỉ"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={locations}
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
                  value={getValues("jobType")}
                  allowClear={true}
                  fieldNames={{ label: "code", value: "value" }}
                  placeholder="Loại công việc"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={jobTypes}
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
                htmlFor="salary"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mức lương <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconMoney className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconMoney>
                <Select
                  allowClear={true}
                  placeholder="Mức lương"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  onChange={(e) => {
                    setSelectEnterSalary(e);
                  }}
                  options={dataEnterSalary}
                />
                {selectEnterSalary == "fix" ? (
                  <div className="flex flex-col gap-2 mt-3">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-900"
                    ></label>
                    <Controller
                      name="maxPay"
                      control={control}
                      render={({ field }) => (
                        <VNCurrencyInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ) : selectEnterSalary == "between" ? (
                  <div className="grid grid-cols-2 mt-5 gap-5">
                    <Controller
                      name="minPay"
                      control={control}
                      render={({ field }) => (
                        <VNCurrencyInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                    <Controller
                      name="maxPay"
                      control={control}
                      render={({ field }) => (
                        <VNCurrencyInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ) : selectEnterSalary == "up" ? (
                  <div className="mt-5 flex flex-col">
                    <label
                      htmlFor=""
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Lên tới
                    </label>
                    <Controller
                      name="maxPay"
                      control={control}
                      render={({ field }) => (
                        <VNCurrencyInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ) : selectEnterSalary == "more" ? (
                  <div className="mt-5 flex flex-col">
                    <Controller
                      name="minPay"
                      control={control}
                      render={({ field }) => (
                        <VNCurrencyInput
                          value={field.value}
                          onValueChange={field.onChange}
                        />
                      )}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {errors?.minPay?.type == "required" ? (
                <p className="text-red-600 mt-1">*Bạn chưa điền mức lương</p>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-5">
            <div className="">
              <label
                htmlFor="skillIdList"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Kỹ năng <span className="text-red-500">*</span>
              </label>
              <div className="mt-2 relative">
                <IconClipboardDocument className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClipboardDocument>
                <Select
                  mode="tags"
                  {...register("skillIdList", {
                    required: true,
                  })}
                  style={{ width: "100%" }}
                  placeholder="Kỹ năng"
                  value={getValues("skillIdList")}
                  fieldNames={{ label: "name", value: "id" }}
                  className="skill select-custom min-h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 border border-stone-200 border-solid w-full rounded-md"
                  options={skills.length > 0 ? skills : []}
                  allowClear
                  onChange={(e) => {
                    console.log("🚀 ~ e:", e);
                    setValue("skillIdList", e);
                    clearErrors("skillIdList");
                  }}
                />
              </div>
              {errors?.skillIdList?.type == "required" ? (
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
                  value={getValues("gender")}
                  placeholder="Giới tính"
                  className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                  optionFilterProp="children"
                  filterOption={(input, option: any) =>
                    (option?.label ?? "").includes(input)
                  }
                  options={genders}
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
                setJobDescription(content);
              }}
              className="mt-2"
            />
          </div>

          <div className="flex justify-end mt-10">
            <ButtonLoading
              title="Lưu thông tin"
              loading={loadingJob}
            ></ButtonLoading>
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployerPostJobPage;
