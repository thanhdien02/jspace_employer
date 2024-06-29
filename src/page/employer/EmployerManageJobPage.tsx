import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import TitleContent from "../../components/title/TitleContent";
import { Empty, Input, Pagination, Select, Skeleton } from "antd";
import Table from "../../components/table/Table";
import CardManageJobPage from "../../components/cards/CardManageJobPage";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import EmployerUpdateJobPage from "./EmployerUpdateJobPage";
import { dataHeaderManageJob } from "../../utils/dataFetch";
import EmployerManageCandidateApplyJobPage from "./EmployerManageCandidateApplyJobPage";
import { useDispatch, useSelector } from "react-redux";
import { jobGetPostedJob } from "../../store/job/job-slice";
import IconAdd from "../../components/icons/IconAdd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;
const EmployerManageJobPage: React.FC = () => {
  const { companyAuth, checkAuth } = useSelector((state: any) => state.auth);
  const { loadingJob, postedJobs, paginationPostedJob } = useSelector(
    (state: any) => state.job
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateJob, setUpdateJob] = useState(false);
  const [candidateApply, setCandidateApply] = useState(false);
  const [jobId, setJobId] = useState("");
  const handleSearchJob = debounce((value: any) => {
    console.log("Input value:", value);
  }, 500);
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(
        jobGetPostedJob({ company_id: companyAuth?.id, page: page, size: 10 })
      );
    }
  }, [companyAuth, page]);
  return (
    <>
      <div className="m-10 mt-5">
        <TitleContent className="!text-primary">
          Danh sách công việc đã đăng
        </TitleContent>
        <div className="my-5 flex gap-4">
          <Search
            placeholder="Nhập tên công việc"
            enterButton="Tìm kiếm"
            size="large"
            onSearch={(e) => console.log(e)}
            onInput={(e: any) => {
              handleSearchJob(e?.target?.value);
            }}
            className="w-[30%]"
            loading={false}
            allowClear
          />
          <Select
            allowClear
            size={"large"}
            placeholder="Lọc theo thời gian"
            className="custom-base"
            onChange={() => {}}
            style={{ width: 200 }}
            options={[
              {
                value: "current",
                label: "Bài đăng đang tuyển",
              },
              {
                value: "5nam",
                label: "Bài đăng hết hạn",
              },
            ]}
          />
          <Select
            allowClear
            size={"large"}
            placeholder="Trạng thái bài đăng"
            className="custom-base"
            onChange={() => {}}
            style={{ width: 200 }}
            options={[
              {
                value: "current",
                label: "Bài đăng đang đóng",
              },
              {
                value: "5nam",
                label: "Bài đăng đang mở",
              },
            ]}
          />
          <div
            onClick={() => navigate("/manage/check-work-required")}
            className="ml-auto cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md font-medium"
          >
            <IconAdd></IconAdd>
            <button type="button" className="">
              Đăng tin
            </button>
          </div>
        </div>

        {/*  */}
        <div className="relative">
          <div className="w-full overflow-auto ">
            <Table className="min-w-[2350px] overflow-auto">
              <HeaderTableManageJobPage
                dataHeader={dataHeaderManageJob}
              ></HeaderTableManageJobPage>
              {!checkAuth?.verifiedByCompany ? (
                <tr>
                  <td className="p-5 text-center " colSpan={5}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </td>
                </tr>
              ) : loadingJob ? (
                <tbody className="">
                  <tr>
                    <td className="p-5 text-center" colSpan={10}>
                      <Skeleton active />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {postedJobs?.length <= 0 || !postedJobs.length ? (
                    <tr>
                      <td className="p-5 text-center " colSpan={5}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  ) : (
                    postedJobs?.length > 0 &&
                    postedJobs?.map((item: any) => (
                      <CardManageJobPage
                        className="even:bg-gray-300/50"
                        key={item?.id}
                        item={item}
                        onClickUpdateJob={setUpdateJob}
                        onClickListCandidate={setCandidateApply}
                        onClickSetJobId={setJobId}
                      ></CardManageJobPage>
                    ))
                  )}
                </tbody>
              )}
            </Table>
            <div className="absolute border border-solid border-gray-200 px-4 bg-white w-[350px] h-full right-0 top-0 bottom-0"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          {postedJobs.length <= 0 ? (
            <></>
          ) : (
            <Pagination
              total={paginationPostedJob?.totalElements}
              onChange={(e) => setPage(e)}
              className="inline-block"
              current={page}
              pageSize={paginationPostedJob?.pageSize}
            />
          )}
        </div>

        {/* update job */}
        {updateJob ? (
          <EmployerUpdateJobPage
            onClick={setUpdateJob}
            jobId={jobId}
          ></EmployerUpdateJobPage>
        ) : (
          <></>
        )}
        {candidateApply ? (
          <EmployerManageCandidateApplyJobPage
            onClick={setCandidateApply}
            jobId={jobId}
          ></EmployerManageCandidateApplyJobPage>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EmployerManageJobPage;
