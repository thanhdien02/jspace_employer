import { Select, Skeleton, Switch, Tabs, TabsProps } from "antd";
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
import VNCurrencyInput from "../../components/input/InputMoney";
import InputNumber from "../../components/input/InputNumber";
import IconClose from "../../components/icons/IconClose";
import {
  jobGetJobById,
  jobUpdateJob,
  jobUpdateJobStatus,
} from "../../store/job/job-slice";
const handleSalaryUpdate = (dataPosJob: any, salaryType: string) => {
  let dataPosJobFinal = null;
  if (salaryType == "more") {
    dataPosJobFinal = {
      ...dataPosJob,
      maxPay: "2147483647",
    };
  } else if (salaryType == "up") {
    dataPosJobFinal = {
      ...dataPosJob,
      minPay: "0",
    };
  } else return dataPosJob;
  return dataPosJobFinal;
};
interface Inputs {
  title?: string;
  minPay: string;
  maxPay: string;
  location?: string;
  description?: string;
  quantity: string;
  experience?: string;
  skillIdList?: string | string[];
  newSkills?: string | string[];
  rank?: string;
  jobType?: string;
  gender?: string;
}
interface PropComponent {
  className?: string;
  jobId?: string;
  onClick?: any;
}
const EmployerUpdateJobPage: React.FC<PropComponent> = ({
  className,
  jobId,
  onClick,
}) => {
  const { locations, ranks, jobTypes, experiences, genders, skills } =
    useSelector((state: any) => state.common);
  const { loadingJobById, jobById } = useSelector((state: any) => state.job);
  const dispatch = useDispatch();
  const [jobDescription, setJobDescription] = useState("");
  const [selectEnterSalary, setSelectEnterSalary] = useState("");
  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (dataUpdateCompany: Inputs) => {
    console.log("🚀 ~ dataUpdateCompany:", dataUpdateCompany);
    let dataUpdate = handleSalaryUpdate(dataUpdateCompany, selectEnterSalary);
    dispatch(
      jobUpdateJob({
        job_id: jobById?.post?.id,
        dataUpdateJob: dataUpdate,
        company_id: jobById?.post?.company?.id,
      })
    );
  };
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = "visible";
      };
    }
  }, []);
  useEffect(() => {
    dispatch(commonGetLocation());
    dispatch(commonGetJobType());
    dispatch(commonGetGender());
    dispatch(commonGetRank());
    dispatch(commonGetExperience());
    dispatch(commonGetSkills());
    dispatch(jobGetJobById({ job_id: jobId }));
    setValue("newSkills", []);
  }, []);
  useEffect(() => {
    if (jobById?.post?.id) {
      setValue("title", jobById?.post?.title);
      setValue("location", jobById?.post?.location?.value);
      setValue("experience", jobById?.post?.experience?.value);
      setValue("jobType", jobById?.post?.jobType?.value);
      setValue("gender", jobById?.post?.gender?.value);
      setValue("quantity", jobById?.post?.quantity);
      setValue("rank", jobById?.post?.rank?.value);
      setValue("description", jobById?.post?.description);
      // Skills
      const lskill = jobById?.post?.skills.map((item: any) => item?.id);
      setValue("skillIdList", lskill);

      // description
      setJobDescription(jobById?.post?.description);
      // salary
      if (
        jobById?.post?.minPay != "0" &&
        jobById?.post?.maxPay != "0" &&
        jobById?.post?.maxPay != "2147483647"
      ) {
        setValue("minPay", jobById?.post?.minPay.toString());
        setValue("maxPay", jobById?.post?.maxPay.toString());
        setSelectEnterSalary("between");
      } else if (
        jobById?.post?.minPay != "0" &&
        jobById?.post?.maxPay == "2147483647"
      ) {
        setValue("minPay", jobById?.post?.minPay.toString());
        setSelectEnterSalary("more");
      } else if (jobById?.post?.minPay == "0" && jobById?.post?.maxPay != "0") {
        setSelectEnterSalary("up");
        setValue("maxPay", jobById?.post?.maxPay.toString());
      }
    }
  }, [jobById]);
  const itemsSkills: TabsProps["items"] = [
    {
      key: "1",
      label: "Kỹ năng",
      children: (
        <div className="relative">
          <IconClipboardDocument className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClipboardDocument>
          <Select
            mode="tags"
            {...register("skillIdList", {
              required: true,
            })}
            style={{ width: "100%" }}
            placeholder="Kỹ năng"
            value={getValues("skillIdList")}
            filterOption={(input: string, option: any) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes((input ?? "").toLowerCase())
            }
            // fieldNames={{ label: "name", value: "id" }}
            className="skill select-custom min-h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 border border-stone-200 border-solid w-full rounded-md"
            // options={skills.length > 0 ? skills : []}
            options={
              skills.length > 0 &&
              skills.map((item: any) => ({
                label: item?.name,
                value: item?.id,
              }))
            }
            allowClear
            onChange={(e) => {
              setValue("skillIdList", e);
              clearErrors("skillIdList");
            }}
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Thêm kỹ năng mới",
      children: (
        <div className="relative">
          <IconClipboardDocument className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconClipboardDocument>
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Kỹ năng mới"
            value={getValues("newSkills")}
            fieldNames={{ label: "name", value: "id" }}
            className="skill select-custom min-h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 border border-stone-200 border-solid w-full rounded-md"
            options={[]}
            allowClear
            onChange={(e) => {
              setValue("newSkills", e);
              clearErrors("newSkills");
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="fixed z-20 inset-0">
        <div
          onClick={() => onClick(false)}
          className={`fixed z-10 flex inset-0 bg-black/30 ${className}`}
        ></div>
        <div className="absolute inset-0 z-10 shadow-lg m-auto w-[70%] h-[80%] p-10 bg-white overflow-auto">
          <span
            className="absolute right-3 top-3 cursor-pointer hover:bg-gray-200 rounded-sm"
            onClick={() => onClick(false)}
          >
            <IconClose></IconClose>
          </span>
          <div className="flex justify-between items-end">
            <h2 className="font-bold text-lg my-2 text-gray-800">
              Cập nhật tin công việc
            </h2>
            <div className="mr-5">
              <p className="font-medium text-sm">Tình trạng công việc</p>
              <div>
                <Switch
                  className="mt-2"
                  size="default"
                  value={
                    jobById?.post?.postStatus?.value == "OPEN" ? true : false
                  }
                  onChange={() => {
                    let status = "";
                    if (jobById?.post?.postStatus?.value == "OPEN")
                      status = "CLOSE";
                    else status = "OPEN";
                    dispatch(
                      jobUpdateJobStatus({
                        job_id: jobId,
                        job_status: status,
                        company_id: jobById?.post?.company?.id,
                      })
                    );
                  }}
                />
              </div>
            </div>
          </div>

          {loadingJobById ? (
            <Skeleton />
          ) : (
            <form action="" onSubmit={handleSubmit(onSubmit)} className="py-5">
              <div className="grid grid-cols-2 gap-10">
                <div>
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
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền giới tính
                    </p>
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
                      value={getValues("experience")}
                      className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 pl-10 py-3 border border-stone-200 border-solid w-full rounded-md"
                      optionFilterProp="children"
                      // fieldNames={{ label: "code", value: "value" }}
                      // filterOption={(input, option: any) =>
                      //   (option?.label ?? "").includes(input)
                      // }
                      // options={experiences}

                      filterOption={(input: string, option: any) =>
                        ((option?.label ?? "") as string)
                          .toLowerCase()
                          .includes((input ?? "").toLowerCase())
                      }
                      options={
                        experiences?.length > 0 &&
                        experiences.map((item: any) => ({
                          label: item?.code,
                          value: item?.value,
                        }))
                      }
                      onChange={(e) => {
                        setValue("experience", e);
                        clearErrors("experience");
                      }}
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
                    htmlFor="quantity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Số lượng tuyển <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-2">
                    <IconGroupUser className="absolute top-0 left-0 translate-x-[50%] translate-y-[40%] text-gray-400"></IconGroupUser>
                    <Controller
                      name="quantity"
                      control={control}
                      rules={{ required: "Số lượng tuyển là bắt buộc" }}
                      defaultValue=""
                      render={({ field }) => (
                        <InputNumber
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Số lượng tuyển"
                        />
                      )}
                    />
                  </div>
                  {errors?.quantity?.type == "required" ? (
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền số lượng ứng viên cho công việc
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
                      {...register("rank", {
                        required: true,
                      })}
                      placeholder="Vị trí"
                      allowClear={true}
                      value={getValues("rank")}
                      className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                      optionFilterProp="children"
                      // fieldNames={{ label: "code", value: "value" }}
                      // filterOption={(input, option: any) =>
                      //   (option?.label ?? "").includes(input)
                      // }
                      // options={ranks}
                      filterOption={(input: string, option: any) =>
                        ((option?.label ?? "") as string)
                          .toLowerCase()
                          .includes((input ?? "").toLowerCase())
                      }
                      options={
                        ranks?.length > 0 &&
                        ranks.map((item: any) => ({
                          label: item?.code,
                          value: item?.value,
                        }))
                      }
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
                      // fieldNames={{ label: "province", value: "value" }}
                      allowClear={true}
                      placeholder="Địa chỉ"
                      className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                      optionFilterProp="children"
                      filterOption={(input: string, option: any) =>
                        ((option?.label ?? "") as string)
                          .toLowerCase()
                          .includes((input ?? "").toLowerCase())
                      }
                      options={
                        locations?.length > 0 &&
                        locations.map((item: any) => ({
                          label: item?.province,
                          value: item?.value,
                        }))
                      }
                      // options={locations}
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
                <div>
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
                      placeholder="Loại công việc"
                      className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                      optionFilterProp="children"
                      // fieldNames={{ label: "code", value: "value" }}
                      // filterOption={(input, option: any) =>
                      //   (option?.label ?? "").includes(input)
                      // }
                      // options={jobTypes}
                      filterOption={(input: string, option: any) =>
                        ((option?.label ?? "") as string)
                          .toLowerCase()
                          .includes((input ?? "").toLowerCase())
                      }
                      options={
                        jobTypes?.length > 0 &&
                        jobTypes.map((item: any) => ({
                          label: item?.code,
                          value: item?.value,
                        }))
                      }
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
                <div>
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
                        setValue("minPay", "");
                        setValue("maxPay", "");
                      }}
                      options={dataEnterSalary}
                    />
                    {selectEnterSalary == "fix" ? (
                      <div className="flex flex-col gap-2 mt-3">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                        <div className="relative">
                          <Controller
                            name="maxPay"
                            rules={{ required: "Bạn chưa điền mức lương" }}
                            control={control}
                            render={({ field }) => (
                              <VNCurrencyInput
                                value={field.value}
                                onValueChange={field.onChange}
                                className="!pr-12"
                              />
                            )}
                          />
                          <span className="absolute font-medium top-1/2 right-2 -translate-y-1/2">
                            VND
                          </span>
                        </div>
                      </div>
                    ) : selectEnterSalary == "between" ? (
                      <div className="grid grid-cols-2 mt-5 gap-5">
                        <div className="relative">
                          <Controller
                            name="minPay"
                            rules={{ required: "Bạn chưa điền mức lương" }}
                            control={control}
                            render={({ field }) => (
                              <VNCurrencyInput
                                value={field.value}
                                onValueChange={field.onChange}
                                className="!pr-12"
                              />
                            )}
                          />
                          <span className="absolute font-medium top-1/2 right-2 -translate-y-1/2">
                            VND
                          </span>
                        </div>
                        <div className="relative">
                          <Controller
                            name="maxPay"
                            control={control}
                            rules={{ required: "Bạn chưa điền mức lương" }}
                            render={({ field }) => (
                              <VNCurrencyInput
                                value={field.value}
                                onValueChange={field.onChange}
                                className="!pr-12"
                              />
                            )}
                          />
                          <span className="absolute font-medium top-1/2 right-2 -translate-y-1/2">
                            VND
                          </span>
                        </div>
                      </div>
                    ) : selectEnterSalary == "up" ? (
                      <div className="mt-5 flex flex-col">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Lên tới
                        </label>
                        <div className="relative">
                          <Controller
                            name="maxPay"
                            rules={{ required: "Bạn chưa điền mức lương" }}
                            control={control}
                            render={({ field }) => (
                              <VNCurrencyInput
                                value={field.value}
                                onValueChange={field.onChange}
                                className="!pr-12"
                              />
                            )}
                          />
                          <span className="absolute font-medium top-1/2 right-2 -translate-y-1/2">
                            VND
                          </span>
                        </div>
                      </div>
                    ) : selectEnterSalary == "more" ? (
                      <div className="mt-5 flex flex-col">
                        <div className="relative">
                          <Controller
                            name="minPay"
                            control={control}
                            rules={{ required: "Bạn chưa điền mức lương" }}
                            render={({ field }) => (
                              <VNCurrencyInput
                                value={field.value}
                                onValueChange={field.onChange}
                                className="!pr-12"
                              />
                            )}
                          />
                          <span className="absolute font-medium top-1/2 right-2 -translate-y-1/2">
                            VND
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {selectEnterSalary == "NOTFILL" ? (
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền mức lương
                    </p>
                  ) : (
                    <></>
                  )}
                  {errors?.minPay?.type == "required" ||
                  errors?.maxPay?.type == "required" ? (
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền mức lương
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="gap-10 mt-3">
                <div>
                  <Tabs
                    defaultActiveKey="1"
                    items={itemsSkills}
                    // onChange={onChange}
                  />
                  {errors?.skillIdList?.type == "required" ? (
                    <p className="text-red-600 mt-1">*Bạn chưa điền kỹ năng</p>
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
                  loading={loadingJobById}
                ></ButtonLoading>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerUpdateJobPage;
