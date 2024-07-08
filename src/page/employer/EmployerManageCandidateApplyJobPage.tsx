import React, { useEffect, useState } from "react";
import IconClose from "../../components/icons/IconClose";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import { dataHeaderManageCandidateApplyJob } from "../../utils/dataFetch";
import CardManageCandidateApplyJobPage from "../../components/cards/CardManageCandidateApplyJobPage";
import Table from "../../components/table/Table";
import { Empty, Pagination, Select, Skeleton } from "antd";
import { debounce } from "ts-debounce";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { candidateGetAppliedCandidate } from "../../store/candidate/candidate-slice";
import InputSearch from "../../components/input/InputSearch";
interface PropComponent {
  className?: string;
  jobId?: string;
  onClick?: any;
}
const EmployerManageCandidateApplyJobPage: React.FC<PropComponent> = ({
  className,
  jobId,
  onClick,
}) => {
  const { appliedCandidate, loadingCandidate, paginationCandidate } =
    useSelector((state: any) => state.candidate);
  const dispatch = useDispatch();
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [applyStatus, setApplyStatus] = useState("");

  const [page, setPage] = useState(1);
  const [size] = useState(10);
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
    if (jobId) {
      dispatch(
        candidateGetAppliedCandidate({
          job_id: jobId,
          page: page,
          size: size,
          candidateEmail: candidateEmail,
          candidateName: candidateName,
          applyStatus: applyStatus,
        })
      );
    }
  }, []);
  const handleSearchCandidateWithName = debounce((value: any) => {
    if (jobId) {
      dispatch(
        candidateGetAppliedCandidate({
          job_id: jobId,
          page: 1,
          size: size,
          candidateEmail: candidateEmail,
          candidateName: value,
          applyStatus: applyStatus,
        })
      );
    }
    setPage(1);
    setCandidateName(value);
  }, 500);
  const handleSearchCandidateWithEmail = debounce((value: any) => {
    if (jobId) {
      dispatch(
        candidateGetAppliedCandidate({
          job_id: jobId,
          page: 1,
          size: size,
          candidateEmail: value,
          candidateName: candidateName,
          applyStatus: applyStatus,
        })
      );
    }
    setPage(1);
    setCandidateEmail(value);
  }, 500);

  const handleChangePage = (e: any) => {
    dispatch(
      candidateGetAppliedCandidate({
        job_id: jobId,
        page: e,
        size: size,
        candidateEmail: candidateEmail,
        candidateName: candidateName,
        applyStatus: applyStatus,
      })
    );
    setPage(e);
  };
  const handleChangeStatus = (e: any) => {
    dispatch(
      candidateGetAppliedCandidate({
        job_id: jobId,
        page: 1,
        size: size,
        candidateEmail: candidateEmail,
        candidateName: candidateName,
        applyStatus: e,
      })
    );
    setPage(1);
    setApplyStatus(e);
  };
  return (
    <>
      <div className="fixed z-20 inset-0">
        <div
          onClick={() => onClick(false)}
          className={`fixed z-10 flex inset-0 bg-black/30 ${className}`}
        ></div>
        <div className="absolute inset-0 z-10 shadow-lg m-auto w-[80%] h-[80%] p-10 bg-white overflow-auto">
          <span
            className="absolute right-3 top-3 cursor-pointer hover:bg-gray-200 rounded-sm"
            onClick={() => onClick(false)}
          >
            <IconClose></IconClose>
          </span>
          <h2 className="font-bold text-xl mb-3 text-primary">
            Danh sách ứng viên đã ứng tuyển
          </h2>
          <div className="my-5 flex gap-4">
            <div className="relative">
              <InputSearch
                placeholder="Nhập tên ứng viên"
                onChange={(e: any) => {
                  handleSearchCandidateWithName(e?.target?.value);
                }}
                className="pr-10 w-[280px]"
              ></InputSearch>
              <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
            </div>
            <div className="relative">
              <InputSearch
                placeholder="Nhập email ứng viên"
                onChange={(e: any) => {
                  handleSearchCandidateWithEmail(e?.target?.value);
                }}
                className="pr-10 w-[280px]"
              ></InputSearch>
              <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
            </div>
            <Select
              allowClear
              size={"large"}
              placeholder="Tình trạng"
              className="custom-base select-filter"
              onChange={handleChangeStatus}
              style={{ width: 200 }}
              options={[
                {
                  value: "PROGRESS",
                  label: "Progress",
                },
                {
                  value: "REJECT",
                  label: "Reject",
                },
                {
                  value: "APPROVE",
                  label: "Approve",
                },
              ]}
            />
          </div>
          <div className="w-full">
            <Table className="w-full">
              <HeaderTableManageJobPage
                dataHeader={dataHeaderManageCandidateApplyJob}
              ></HeaderTableManageJobPage>
              {loadingCandidate ? (
                <tbody>
                  <tr>
                    <td className="p-5 text-center" colSpan={7}>
                      <Skeleton active />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {appliedCandidate?.length <= 0 || !appliedCandidate.length ? (
                    <tr>
                      <td className="p-5 text-center " colSpan={7}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  ) : (
                    appliedCandidate?.length > 0 &&
                    appliedCandidate?.map((item: any, index: number) => (
                      <CardManageCandidateApplyJobPage
                        key={index}
                        item={item}
                      ></CardManageCandidateApplyJobPage>
                    ))
                  )}
                </tbody>
              )}
            </Table>
            <div className="mt-4 flex justify-end">
              {appliedCandidate.length > 0 && (
                <Pagination
                  total={paginationCandidate?.totalElements}
                  onChange={handleChangePage}
                  className="inline-block"
                  current={page}
                  pageSize={paginationCandidate?.pageSize}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerManageCandidateApplyJobPage;
