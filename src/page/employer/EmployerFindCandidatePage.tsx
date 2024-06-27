import {
  Button,
  message,
  Modal,
  Pagination,
  Popover,
  Progress,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import IconCheck from "../../components/icons/IconCheck";
import IconText from "../../components/icons/IconText";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import {
  commonGetExperience,
  commonGetJobType,
  commonGetLocation,
  commonGetRank,
  commonGetSkills,
} from "../../store/common/common-slice";
import { dataSalary } from "../../utils/dataFetch";
import CardFindCandidatePage from "../../components/cards/CardFindCandidatePage";

const EmployerFindCandidatePage: React.FC = () => {
  const { user, checkAuth } = useSelector((state: any) => state.auth);
  const { locations, experiences } = useSelector(
    (state: any) => state.common
  );
  const [location, setLocation] = useState<any>(null);
  const [experience, setExperience] = useState<any>(null);
  const [salary, setSalary] = useState<any>(null);
  // const [rank, setRank] = useState<any>(null);
  const dispatch = useDispatch();
  const [proccessCheckIdentification, setProccessCheckIdentification] =
    useState(0);

  const [checkrequire, setCheckRequire] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setProccessCheckIdentification(0);
    let progress = 0;
    if (
      checkAuth.hasFullCredentialInfo &&
      checkAuth?.hasCompany &&
      checkAuth?.companyVerified &&
      checkAuth?.verifiedByCompany
    )
      setCheckRequire(false);
    else {
      setCheckRequire(true);
      if (checkAuth.hasFullCredentialInfo) {
        progress += 33.33;
      }
      if (checkAuth?.hasCompany && checkAuth?.companyVerified) {
        progress += 33.33;
      }
      if (checkAuth?.verifiedByCompany) {
        progress += 33.33;
      }
    }
    setProccessCheckIdentification(progress);
  }, [checkAuth]);

  //
  const [openConfirmSendMail, setOpenConfirmSendMail] = useState(false);

  const showModalConfirmSendMail = () => {
    if (checkAuth?.hasCompany && checkAuth?.companyVerified) {
      setOpenConfirmSendMail(true);
    } else {
      message.info(
        "Vui lòng điền thông tin công ty trước khi yêu cầu xác nhận."
      );
    }
  };
  const handleOkConfirmSendMail = () => {
    setOpenConfirmSendMail(false);
  };
  const handleCancelConfirmSendMail = () => {
    setOpenConfirmSendMail(false);
  };

  // get commont
  useEffect(() => {
    dispatch(commonGetLocation());
    dispatch(commonGetJobType());
    dispatch(commonGetRank());
    dispatch(commonGetExperience());
    dispatch(commonGetSkills());
  }, []);
  const handleChangeLocation = (value: any) => {
    setLocation(value);
  };
  const handleChangeExperience = (value: any) => {
    setExperience(value);
  };
  const handleChangeSalary = (value: any) => {
    setSalary(value);
  };


  return (
    <>
      {checkrequire ? (
        <div className="mx-auto max-w-[550px] my-5 mt-10">
          <div className="">
            <h2 className="text-xl font-bold">
              Xin chào, <span className="text-primary">{user?.name}</span>
            </h2>
            <p className="mt-2 font-medium">
              Vui lòng thực hiện các bước xác thực dưới đây để bắt đầu tìm kiếm
              ứng viên.
            </p>
          </div>

          <div className="shadow-sm p-6 bg-white rounded-md mt-5">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-base">Tiến độ hoàn thành</h3>

              <Tooltip title="Các mục đã hoàn thành">
                <Progress
                  steps={3}
                  percent={proccessCheckIdentification}
                  size={[120, 15]}
                />
              </Tooltip>
            </div>
            <div className="flex flex-col gap-4 mt-5">
              <NavLink
                to="/manage/update-information-account"
                className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
              >
                {checkAuth?.hasFullCredentialInfo ? (
                  <IconCheck></IconCheck>
                ) : (
                  <IconText></IconText>
                )}
                <span className="font-medium text-base">
                  Cập nhật thông tin tài khoản
                </span>
              </NavLink>
              <NavLink
                to="/manage/information-company"
                className="flex items-center gap-2 border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
              >
                {checkAuth?.hasCompany && checkAuth?.companyVerified ? (
                  <IconCheck></IconCheck>
                ) : (
                  <IconText></IconText>
                )}
                <span className="font-medium text-base">
                  Cập nhật thông tin công ty
                </span>
              </NavLink>
              <span
                onClick={showModalConfirmSendMail}
                className="flex items-center gap-2 cursor-pointer border border-gray-200 border-solid p-4 shadow-sm rounded-md hover:text-primary  hover:bg-blue-50 transition-all"
              >
                {checkAuth?.verifiedByCompany ? (
                  <IconCheck></IconCheck>
                ) : (
                  <IconText></IconText>
                )}
                <Popover
                  content={
                    <p className="max-w-[300px] font-medium">
                      Nhấn vào để gửi thông báo đến công ty yêu cầu xác nhận là
                      nhân viên của công ty.
                    </p>
                  }
                >
                  <span className="font-medium text-base">
                    Xác thực là thành viên của công ty
                  </span>
                </Popover>
              </span>
              {/* modal confirm */}
              <Modal
                open={openConfirmSendMail}
                title="Gửi yêu cầu xác nhận tài khoản của công ty"
                onOk={handleOkConfirmSendMail}
                onCancel={handleCancelConfirmSendMail}
                footer={[
                  <Button key="back" onClick={handleCancelConfirmSendMail}>
                    Hủy
                  </Button>,
                  <Button
                    key="submit"
                    type="primary"
                    onClick={handleOkConfirmSendMail}
                  >
                    Gửi
                  </Button>,
                ]}
              >
                <p>
                  Yêu cầu của bạn sẽ được gửi đến email của công ty. Vui lòng
                  chờ sự xác nhận của công ty.
                </p>
              </Modal>
            </div>
            <div className="mt-4 text-gray-500 font-medium text-xs px-5">
              <p>
                Hoàn thành danh sách trên để tăng mức độ uy tín thương hiệu
                tuyển dụng của công ty & bảo vệ thương hiệu tuyển dụng trước các
                đối tượng giả mạo
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="xl:mx-32 mx-10 my-5">
          <HeaderContentManage title="Tìm kiếm ứng viên"></HeaderContentManage>
          <div className="bg-white shadow-md p-7 rounded-md">
            <div className="flex gap-5 items-center">
              {/* <input
                type="text"
                placeholder=""
                className="outline-none border border-solid border-gray-200 rounded-md px-5 py-2"
              /> */}
              <Select
                showSearch
                allowClear
                placeholder="Địa chỉ"
                className="select w-[20%] text-base rounded-lg h-full bg-white"
                optionFilterProp="children"
                value={location}
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
                onChange={handleChangeLocation}
              />

              <Select
                showSearch
                allowClear
                className="select w-[20%] text-base rounded-lg h-full bg-white"
                optionFilterProp="children"
                value={experience}
                onChange={handleChangeExperience}
                placeholder="Kinh nghiệm"
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
              />
              <Select
                showSearch
                allowClear
                placeholder="Mức lương"
                className="select w-[20%] text-base rounded-lg h-full bg-white"
                optionFilterProp="children"
                filterOption={(input, option: any) =>
                  (option?.label ?? "").includes(input)
                }
                onChange={handleChangeSalary}
                value={salary}
                options={dataSalary}
              />
              <button
                type="button"
                className="px-3 py-2 bg-primary rounded-md text-white font-medium hover:opacity-80 transition-all"
              >
                Tìm kiếm
              </button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-5">
              <CardFindCandidatePage></CardFindCandidatePage>
              <CardFindCandidatePage></CardFindCandidatePage>
              <CardFindCandidatePage></CardFindCandidatePage>
              <CardFindCandidatePage></CardFindCandidatePage>
            </div>
            <div className="mt-4 flex justify-end">
              {true && (
                <Pagination
                  total={50}
                  // onChange={handleChangePage}
                  className="inline-block"
                  current={1}
                  pageSize={10}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployerFindCandidatePage;
