import React, { useEffect } from "react";
import IconClose from "../../components/icons/IconClose";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import {
  dataHeaderManageCandidateApplyJob,
  dataSideBar,
} from "../../utils/dataFetch";
import CardManageCandidateApplyJobPage from "../../components/cards/CardManageCandidateApplyJobPage";
import Table from "../../components/table/Table";
import { Input, Pagination, Select, Skeleton } from "antd";
import { debounce } from "ts-debounce";
const { Search } = Input;
interface PropComponent {
  className?: string;
  onClick?: any;
}
const EmployerManageCandidateApplyJobPage: React.FC<PropComponent> = ({
  className,
  onClick,
}) => {
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = "visible";
      };
    }
  }, []);
  const handleSearchCandidate = debounce((value: any) => {
    console.log("Input value:", value);
  }, 500);

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
            <Search
              placeholder="Nhập tên ứng viên"
              enterButton="Search"
              size="large"
              onSearch={(e) => console.log(e)}
              onInput={(e: any) => {
                handleSearchCandidate(e?.target?.value);
              }}
              className="w-[30%]"
              loading={false}
              allowClear
            />
            <Select
              allowClear
              size={"large"}
              defaultValue="Tất cả"
              placeholder="Lọc theo"
              className="custom-base"
              onChange={() => {}}
              style={{ width: 200 }}
              options={[
                {
                  value: "current",
                  label: "Tình trạng Spending",
                },
                {
                  value: "5nam",
                  label: "Tình trạng Reject",
                },
                {
                  value: "5nam",
                  label: "Tình trạng Approve",
                },
              ]}
            />
          </div>
          <div className="w-full">
            <Table className="w-full">
              <HeaderTableManageJobPage
                dataHeader={dataHeaderManageCandidateApplyJob}
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
                      <CardManageCandidateApplyJobPage
                        key={index}
                        dataCandidateApply={item}
                      ></CardManageCandidateApplyJobPage>
                    ))}
                </tbody>
              )}
            </Table>
            <div className="mt-4 flex justify-end">
              {false ? (
                <></>
              ) : (
                <Pagination
                  total={50}
                  onChange={() => {}}
                  className="inline-block"
                  current={1}
                  pageSize={10}
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
