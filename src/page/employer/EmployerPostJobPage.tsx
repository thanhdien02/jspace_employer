import { message, Select, Skeleton, Tabs, TabsProps } from "antd";
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
import { jobPostJob, jobUpdateMessageRedux } from "../../store/job/job-slice";
import VNCurrencyInput from "../../components/input/InputMoney";
import InputNumber from "../../components/input/InputNumber";
import {
  productGetBuyedProduct,
  productGetBuyedProductById,
} from "../../store/product/product-slice";
import IconCheck from "../../components/icons/IconCheck";
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

const EmployerPostJobPage: React.FC = () => {
  const { locations, ranks, jobTypes, experiences, genders, skills } =
    useSelector((state: any) => state.common);
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { loadingJob, messageJob } = useSelector((state: any) => state.job);
  const { buyedProducts, buyedproductById, loadingProduct } = useSelector(
    (state: any) => state.product
  );
  const dispatch = useDispatch();
  const [jobDescription, setJobDescription] = useState("");
  const [selectEnterSalary, setSelectEnterSalary] = useState("");
  const [checkSelectProduct, setCheckSelectProduct] = useState(false);
  const [checkSelectProductInfor, setCheckSelectProductInfor] = useState("");
  const [dataSelectProduct, setDataSelectProduct] = useState<any>("");
  const [productCurrent, setProductCurrent] = useState<any>(null);
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
    if (
      (dataPosJob?.minPay == undefined && dataPosJob?.maxPay == undefined) ||
      (dataPosJob?.minPay == "" && dataPosJob?.maxPay == "")
    ) {
      setSelectEnterSalary("NOTFILL");
    } else {
      const dataPost = handleSalaryUpdate(dataPosJob, selectEnterSalary);
      console.log("🚀 ~ dataPost:", dataPost);
      // use buyed product
      if (productCurrent) {
        dispatch(
          jobPostJob({
            ...dataPost,
            companyId: companyAuth?.id,
            useTrialPost: false,
            purchasedProductId: productCurrent,
          })
        );
      } else {
        //trial post
        dispatch(
          jobPostJob({
            ...dataPost,
            companyId: companyAuth?.id,
            useTrialPost: true,
            purchasedProductId: null,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (productCurrent) {
      dispatch(
        productGetBuyedProductById({
          product_id: productCurrent,
          company_id: companyAuth?.id,
        })
      );
    }
  }, [productCurrent]);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(commonGetLocation());
    dispatch(commonGetJobType());
    dispatch(commonGetGender());
    dispatch(commonGetRank());
    dispatch(commonGetExperience());
    dispatch(commonGetSkills());
    setValue("newSkills", []);
  }, []);

  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(productGetBuyedProduct({ company_id: companyAuth?.id }));
    }
  }, [companyAuth]);
  useEffect(() => {
    if (buyedProducts?.length) {
      const options = buyedProducts.map((item: any) => ({
        label: item.purchasedProduct.productName,
        value: item.purchasedProduct.id,
        infor: item.purchasedProduct,
      }));
      setDataSelectProduct(options);
    }
  }, [buyedProducts]);

  // reset form
  useEffect(() => {
    if (messageJob == "postsuccess") {
      reset();
      setJobDescription("");
      dispatch(jobUpdateMessageRedux({ messageJob: "" }));
      setValue("newSkills", []);
      // Cập nhật lại số lượng bài đăng nếu chọn gói mua
      if (productCurrent) {
        dispatch(
          productGetBuyedProductById({
            product_id: productCurrent,
            company_id: companyAuth?.id,
          })
        );
      }
    }
  }, [messageJob]);

  // tab
  const onChange = (key: string) => {
    console.log(key);
  };
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
      <div className="xl:mx-40 mx-10 my-10 bg-white px-8 py-5 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-10 items-center">
          <h2 className="font-bold text-xl my-2 text-gray-800">Đăng tin</h2>
          {checkSelectProduct ? (
            <div className="ml-auto flex gap-2 items-center">
              {productCurrent && (
                <span className="font-medium py-2 px-4 rounded-md bg-gray-200">
                  {buyedproductById?.productName} (SLBĐ còn lại{" "}
                  {buyedproductById?.productNumberOfPost})
                </span>
              )}

              <button
                type="button"
                className="px-3 py-2 rounded-md text-white bg-primary font-medium hover:opacity-80 transition-all"
                onClick={() => setCheckSelectProduct(!checkSelectProduct)}
              >
                Thay đổi gói bài đăng
              </button>
            </div>
          ) : (
            <div
              className={`ml-auto ${companyAuth?.trialPost == 0 && "hidden"}`}
            >
              <button
                type="button"
                className="px-4 py-2 rounded-md text-white bg-primary font-medium"
                onClick={() => {
                  setCheckSelectProduct(!checkSelectProduct);
                  setProductCurrent(null);
                  setCheckSelectProductInfor("");
                }}
              >
                Sử dụng gói trial ({companyAuth?.trialPost})
              </button>
            </div>
          )}
        </div>

        {!checkSelectProduct ? (
          <div className="">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6"
            >
              Lựa chọn gói bài đăng
            </label>
            <Select
              allowClear
              placeholder="Lựa chọn gói đăng bài"
              className="select-custom mt-2 mb-2 w-full h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pr-4 py-3 border border-stone-200 border-solid rounded-md"
              optionFilterProp="children"
              value={productCurrent}
              filterOption={(input, option: any) =>
                (option?.label ?? "").includes(input)
              }
              onChange={(e) => {
                setProductCurrent(e);
                setCheckSelectProductInfor(e);
              }}
              options={dataSelectProduct ? dataSelectProduct : []}
            />

            {checkSelectProductInfor &&
              (loadingProduct ? (
                <div className="py-5">
                  <Skeleton />
                </div>
              ) : (
                <div className="mt-5">
                  <h4 className="font-semibold text-lg">Thông tin dịch vụ</h4>
                  <div className="mt-3">
                    <div className="flex items-center gap-3">
                      {/* <h3 className="text-xl font-semibold text-red-500">
                        {buyedproductById?.productName}
                      </h3> */}
                      {/* <span className="font-medium text-xl">-</span> */}
                      {/* <p className="text-xl font-semibold text-red-500">
                        {buyedproductById?.productPrice}$ /{" "}
                        {convertDollarToVN(
                          Number(buyedproductById?.productPrice),
                          24000
                        ).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                        <span className="text-red-500">*</span>
                      </p> */}
                    </div>
                    <ul className="text-base mt-3">
                      <li className="flex items-center gap-2 mt-2">
                        <IconCheck
                          className="text-primary"
                          classIcon="!w-5 !h-5"
                        ></IconCheck>
                        <span className="text-gray-600">
                          Số lượng bài đăng còn lại
                          <span className="font-bold">
                            {` ${buyedproductById?.productNumberOfPost} bài đăng`}
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center gap-2 mt-2">
                        <IconCheck
                          className="text-primary"
                          classIcon="!w-5 !h-5"
                        ></IconCheck>
                        <span className="text-gray-600">
                          Thời gian sử dụng của gói
                          <span className="font-bold">
                            {` ${buyedproductById?.productDurationDayNumber} ngày `}
                          </span>
                          kễ từ ngày mua - Ngày hết hạn:{" "}
                          <span className="font-bold">
                            {buyedproductById?.expiryDate}
                          </span>
                        </span>
                      </li>
                      <li className="flex items-center gap-2 mt-2">
                        <IconCheck
                          className="text-primary"
                          classIcon="!w-5 !h-5"
                        ></IconCheck>
                        <span className="text-gray-600">
                          Thời gian mỗi bài đăng
                          <span className="font-bold">
                            {` ${buyedproductById?.productPostDuration} ngày `}
                          </span>
                          kể từ ngày đăng
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (buyedproductById?.productNumberOfPost == 0) {
                          message.info(
                            "Gói sản phẩm đã hết bài đăng. Hãy chọn gói khác"
                          );
                        } else setCheckSelectProduct(true);
                      }}
                      className="px-6 py-2 ml-auto font-medium rounded-md bg-primary text-white text-base hover:opacity-80 transition-all"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <></>
        )}

        {checkSelectProduct && (
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
                {errors.title?.type == "required" && (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền tên công việc
                  </p>
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
                    options={genders?.map((item: any) => ({
                      label: item?.language?.vi,
                      value: item?.value,
                    }))}
                    onChange={(e) => {
                      setValue("gender", e);
                      clearErrors("gender");
                    }}
                  />
                </div>
                {errors?.gender?.type == "required" && (
                  <p className="text-red-600 mt-1">*Bạn chưa điền giới tính</p>
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
                    filterOption={(input: string, option: any) =>
                      ((option?.label ?? "") as string)
                        .toLowerCase()
                        .includes((input ?? "").toLowerCase())
                    }
                    options={
                      experiences?.length > 0 &&
                      experiences.map((item: any) => ({
                        label: item?.language?.vi,
                        value: item?.value,
                      }))
                    }
                    onChange={(e) => {
                      setValue("experience", e);
                      clearErrors("experience");
                    }}
                  />
                  {errors?.experience?.type == "required" && (
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền kinh nghiệm
                    </p>
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
                {errors?.quantity?.type == "required" && (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền số lượng ứng viên cho công việc
                  </p>
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
                    {...register("rank", {
                      required: true,
                    })}
                    showSearch
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
                {errors?.rank?.type == "required" && (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền vị trí công việc
                  </p>
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
                    onChange={(e) => {
                      setValue("location", e);
                      clearErrors("location");
                    }}
                  />
                </div>
                {errors?.location?.type == "required" && (
                  <p className="text-red-600 mt-1">*Bạn chưa điền địa chỉ</p>
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
                    // fieldNames={{ label: "code", value: "value" }}
                    placeholder="Loại công việc"
                    className="select-custom h-11 focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-10 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md"
                    optionFilterProp="children"
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
                {errors?.jobType?.type == "required" && (
                  <p className="text-red-600 mt-1">
                    *Bạn chưa điền thời gian làm việc
                  </p>
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
                  {selectEnterSalary == "between" ? (
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
                {selectEnterSalary == "NOTFILL" && (
                  <p className="text-red-600 mt-1">*Bạn chưa điền mức lương</p>
                )}
                {errors?.minPay?.type == "required" ||
                  (errors?.maxPay?.type == "required" && (
                    <p className="text-red-600 mt-1">
                      *Bạn chưa điền mức lương
                    </p>
                  ))}
              </div>
            </div>
            <div className="gap-10 mt-3">
              <div>
                <Tabs
                  defaultActiveKey="1"
                  items={itemsSkills}
                  onChange={onChange}
                />
                {errors?.skillIdList?.type == "required" && (
                  <p className="text-red-600 mt-1">*Bạn chưa điền kỹ năng</p>
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
        )}
      </div>
    </>
  );
};

export default EmployerPostJobPage;
