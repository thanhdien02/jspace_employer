import {
  Button,
  message,
  Modal,
  Pagination,
  Popover,
  Progress,
  Skeleton,
  Tooltip,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
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
import CardFindCandidatePage from "../../components/cards/CardFindCandidatePage";
import { candidateGetFindCandidate } from "../../store/candidate/candidate-slice";
import InputSearch from "../../components/input/InputSearch";
import { debounce } from "ts-debounce";

const EmployerFindCandidatePage: React.FC = () => {
  const { findCandidate, paginationFindCandidate, loadingCandidate } =
    useSelector((state: any) => state.candidate);
  const { user, checkAuth } = useSelector((state: any) => state.auth);

  // search
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(9);
  //
  // const [rank, setRank] = useState<any>(null);
  const dispatch = useDispatch();
  const [proccessCheckIdentification, setProccessCheckIdentification] =
    useState(0);

  const [checkrequire, setCheckRequire] = useState(false);
  const [loadingCheck, setloadingCheck] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setloadingCheck(true);
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

  //
  const handleSearchName = debounce((value: any) => {
    dispatch(
      candidateGetFindCandidate({
        name: value,
        email: email,
        phone: "",
        page: 1,
        size: size,
      })
    );
    setName(value);
    setPage(1);
  }, 500);
  const handleSearchEmail = debounce((value: any) => {
    dispatch(
      candidateGetFindCandidate({
        name: name,
        email: value,
        phone: "",
        page: 1,
        size: size,
      })
    );
    setEmail(value);
    setPage(1);
  }, 500);
  const handleChangePage = (e: any) => {
    dispatch(
      candidateGetFindCandidate({
        name: name,
        email: email,
        phone: "",
        page: e,
        size: size,
      })
    );
    setPage(e);
  };
  useEffect(() => {
    dispatch(
      candidateGetFindCandidate({
        name: name,
        email: email,
        phone: "",
        page: page,
        size: size,
      })
    );
  }, []);
  return (
    <>
      {!loadingCheck ? (
        <></>
      ) : checkrequire ? (
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
        <div className="xl:mx-28 mx-10 my-5">
          <HeaderContentManage title="Tìm kiếm ứng viên"></HeaderContentManage>
          <div className="bg-white shadow-md p-7 rounded-md ">
            <div className="flex gap-5">
              <div className="flex gap-5">
                <div className="relative">
                  <InputSearch
                    placeholder="Nhập tên ứng viên"
                    onChange={(e: any) => {
                      handleSearchName(e?.target?.value);
                    }}
                    className="pr-10 w-[280px]"
                  ></InputSearch>
                  <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
                </div>
                <div className="relative">
                  <InputSearch
                    placeholder="Nhập email"
                    onChange={(e: any) => {
                      handleSearchEmail(e?.target?.value);
                    }}
                    className="pr-10 w-[280px]"
                  ></InputSearch>
                  <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
                </div>
              </div>
            </div>
            {loadingCandidate ? (
              <div className="py-5">
                <Skeleton />
              </div>
            ) : findCandidate?.length <= 0 ? (
              <div className="py-10 text-base text-gray-600 font-medium text-center">
                Không có dữ liệu
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-3 gap-5">
                {findCandidate?.length > 0 &&
                  findCandidate.map((item: any) => (
                    <CardFindCandidatePage
                      key={item?.user?.id}
                      item={item}
                    ></CardFindCandidatePage>
                  ))}
              </div>
            )}
            <div className="mt-4 flex justify-end">
              {findCandidate?.length > 0 && (
                <Pagination
                  total={paginationFindCandidate?.totalElements}
                  onChange={handleChangePage}
                  className="inline-block panigation"
                  current={page}
                  pageSize={paginationFindCandidate?.pageSize}
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
