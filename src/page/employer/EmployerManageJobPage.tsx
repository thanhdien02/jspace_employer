import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import { SearchOutlined } from "@ant-design/icons";
import TitleContent from "../../components/title/TitleContent";
import { Empty, Pagination, Select, Skeleton } from "antd";
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
import InputSearch from "../../components/input/InputSearch";
const EmployerManageJobPage: React.FC = () => {
  const { companyAuth, checkAuth } = useSelector((state: any) => state.auth);
  const { loadingJob, postedJobs, paginationPostedJob } = useSelector(
    (state: any) => state.job
  );
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postStatus, setPostStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [size] = useState(10);
  const [updateJob, setUpdateJob] = useState(false);
  const [candidateApply, setCandidateApply] = useState(false);
  const [jobId, setJobId] = useState("");
  const handleSearchJob = debounce((value: any) => {
    if (companyAuth?.id) {
      dispatch(
        jobGetPostedJob({
          company_id: companyAuth?.id,
          title: value,
          postStatus: postStatus,
          duration: duration,
          page: 1,
          size: size,
        })
      );
    }
    setPage(1);
    setTitle(value);
  }, 500);
  const handleChangeDuration = (e: any) => {
    if (companyAuth?.id) {
      dispatch(
        jobGetPostedJob({
          company_id: companyAuth?.id,
          title: title,
          postStatus: postStatus,
          duration: e,
          page: 1,
          size: size,
        })
      );
    }
    setPage(1);
    setDuration(e);
  };
  const handleChangePostStatus = (e: any) => {
    if (companyAuth?.id) {
      dispatch(
        jobGetPostedJob({
          company_id: companyAuth?.id,
          title: title,
          postStatus: e,
          duration: duration,
          page: 1,
          size: size,
        })
      );
    }
    setPage(1);
    setPostStatus(e);
  };
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(
        jobGetPostedJob({
          company_id: companyAuth?.id,
          title: title,
          postStatus: postStatus,
          duration: duration,
          page: page,
          size: size,
        })
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
          <div className="relative">
            <InputSearch
              placeholder="Nhập tên công việc"
              onChange={(e: any) => {
                handleSearchJob(e?.target?.value);
              }}
              className="pr-10 w-[280px]"
            ></InputSearch>
            <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
          </div>
          <Select
            allowClear
            size={"large"}
            placeholder="Lọc theo thời gian"
            className="custom-base select-filter"
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
            className="custom-base select-filter"
            onChange={handleChangePostStatus}
            style={{ width: 200 }}
            options={[
              {
                value: "CLOSE",
                label: "Bài đăng đang đóng",
              },
              {
                value: "OPEN",
                label: "Bài đăng đang mở",
              },
            ]}
          />
          <Select
            allowClear
            size={"large"}
            placeholder="Còn hạn & hết hạn"
            className="custom-base select-filter"
            onChange={handleChangeDuration}
            style={{ width: 200 }}
            options={[
              {
                value: "unexpired",
                label: "Còn hạn đăng tuyển",
              },
              {
                value: "expired",
                label: "Hết hạn đăng tuyển",
              },
            ]}
          />
          <div
            onClick={() => navigate("/manage/check-work-required")}
            className="ml-auto cursor-pointer flex items-center gap-2 px-4 py-2 text-base bg-white text-primary rounded font-medium shadow border border-primary border-solid"
          >
            <IconAdd></IconAdd>
            <button type="button" className="">
              ĐĂNG TIN
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
                <tbody>
                  <tr>
                    <td className="p-5 text-center " colSpan={5}>
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    </td>
                  </tr>
                </tbody>
              ) : loadingJob ? (
                <tbody>
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
                        key={item?.post?.id}
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
          {postedJobs.length > 0 && (
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
        {updateJob && (
          <EmployerUpdateJobPage
            onClick={setUpdateJob}
            jobId={jobId}
          ></EmployerUpdateJobPage>
        )}
        {candidateApply && (
          <EmployerManageCandidateApplyJobPage
            onClick={setCandidateApply}
            jobId={jobId}
          ></EmployerManageCandidateApplyJobPage>
        )}
      </div>
    </>
  );
};

export default EmployerManageJobPage;
