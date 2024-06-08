import React, { useEffect } from "react";
import IconClose from "../../components/icons/IconClose";
import HeaderTableManageJobPage from "../../components/header/HeaderTableManageJobPage";
import { dataHeaderManageCandidateApplyJob } from "../../utils/dataFetch";
import CardManageCandidateApplyJobPage from "../../components/cards/CardManageCandidateApplyJobPage";
import Table from "../../components/table/Table";
import { Empty, Input, Pagination, Select, Skeleton } from "antd";
import { debounce } from "ts-debounce";
import { useDispatch, useSelector } from "react-redux";
import { candidateGetAppliedCandidate } from "../../store/candidate/candidate-slice";
const { Search } = Input;
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
  const { appliedCandidate, loadingCandidate } = useSelector(
    (state: any) => state.candidate
  );
  const dispatch = useDispatch();
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
          page: 0,
          size: 10,
        })
      );
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
              enterButton="Tìm kiếm"
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
              {loadingCandidate ? (
                <tbody className="">
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
              {appliedCandidate.length <= 0 ? (
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
