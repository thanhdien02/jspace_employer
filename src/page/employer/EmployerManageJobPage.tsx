import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import TitleContent from "../../components/title/TitleContent";
import { Input, Pagination, Select, Skeleton } from "antd";
import Table from "../../components/table/Table";
import CardManageJobPage from "../../components/cards/CardManageJobPage";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import EmployerUpdateJobPage from "./EmployerUpdateJobPage";
import { dataHeaderManageJob, dataSideBar } from "../../utils/dataFetch";
import EmployerManageCandidateApplyJobPage from "./EmployerManageCandidateApplyJobPage";
const { Search } = Input;
const EmployerManageJobPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const [updateJob, setUpdateJob] = useState(false);
  const [candidateApply, setCandidateApply] = useState(false);
  useEffect(() => {}, [page]);
  const handleSearchJob = debounce((value: any) => {
    console.log("Input value:", value);
  }, 500);

  return (
    <>
      <div className="m-10 mt-5">
        <TitleContent className="!text-primary">
          Danh sách công việc đã đăng
        </TitleContent>
        <div className="my-5 flex gap-4">
          <Search
            placeholder="Nhập tên công việc"
            enterButton="Search"
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
            defaultValue="Tất cả"
            placeholder="Lựa chọn"
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
        </div>

        {/*  */}
        <div className="relative">
          <div className="w-full overflow-auto ">
            <Table className="min-w-[2200px] overflow-auto">
              <HeaderTableManageJobPage
                dataHeader={dataHeaderManageJob}
              ></HeaderTableManageJobPage>
              {false ? (
                <tbody className="">
                  <tr>
                    <td className="p-5 text-center" colSpan={7}>
                      <Skeleton active />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {dataSideBar?.length > 0 &&
                    dataSideBar?.map((item: any, index: number) => (
                      <CardManageJobPage
                        key={index}
                        data={item}
                        onClickUpdateJob={setUpdateJob}
                        onClickListCandidate={setCandidateApply}
                      ></CardManageJobPage>
                    ))}
                </tbody>
              )}
            </Table>
            <div className="absolute border border-solid border-gray-200 px-4 bg-white w-[350px] h-full right-0 top-0 bottom-0"></div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          {false ? (
            <></>
          ) : (
            <Pagination
              total={50}
              onChange={(e) => setPage(e)}
              className="inline-block"
              current={page}
              pageSize={10}
            />
          )}
        </div>

        {/* update job */}
        {updateJob ? (
          <EmployerUpdateJobPage
            onClick={setUpdateJob}
            updateCheck={updateJob}
          ></EmployerUpdateJobPage>
        ) : (
          <></>
        )}
        {candidateApply ? (
          <EmployerManageCandidateApplyJobPage
            onClick={setCandidateApply}
          ></EmployerManageCandidateApplyJobPage>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EmployerManageJobPage;
