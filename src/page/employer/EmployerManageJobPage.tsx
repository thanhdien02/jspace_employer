import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import TitleContent from "../../components/title/TitleContent";
import { Input, Pagination, Select, Skeleton } from "antd";
import Table from "../../components/table/Table";
import CardManageJobPage from "../../components/cards/CardManageJobPage";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import EmployerUpdateJobPage from "./EmployerUpdateJobPage";
const { Search } = Input;
const EmployerManageJobPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const [updateJob, setUpdateJob] = useState(false);
  useEffect(() => {}, [page]);
  const handleSearchCompany = debounce((value: any) => {
    console.log("Input value:", value);
  }, 500);

  const handleChange = (value: string) => {
    console.log("🚀 ~ handleChange ~ value:", value);
    // dispatch(
    //   companyrequestreviewGetCompanyRequest({ page: page, reviewed: value })
    // );
    // setReviewed(value);
  };
  return (
    <>
      <div className="m-10 mt-5">
        <TitleContent>Danh sách công ty muốn đăng ký</TitleContent>
        <div className="mb-5 flex gap-4">
          <Search
            placeholder="Nhập tên công việc"
            enterButton="Search"
            size="large"
            onSearch={(e) => console.log(e)}
            onInput={(e: any) => {
              handleSearchCompany(e?.target?.value);
            }}
            className="w-[30%]"
            loading={false}
            allowClear
          />
          <Select
            size={"large"}
            defaultValue="Tất cả"
            onChange={handleChange}
            style={{ width: 200 }}
            options={[]}
          />
        </div>

        {/*  */}
        <div className="relative">
          <div className="w-full overflow-auto ">
            <Table className="min-w-[1600px] max-w-[2000px] overflow-auto">
              <HeaderTableManageJobPage></HeaderTableManageJobPage>
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
                  <CardManageJobPage onClick={setUpdateJob}></CardManageJobPage>
                  <CardManageJobPage onClick={setUpdateJob}></CardManageJobPage>
                  <CardManageJobPage onClick={setUpdateJob}></CardManageJobPage>
                </tbody>
              )}
            </Table>
            <div className="absolute bg-white w-[100px] h-full right-0 top-0 bottom-0"></div>
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
      </div>
    </>
  );
};

export default EmployerManageJobPage;
