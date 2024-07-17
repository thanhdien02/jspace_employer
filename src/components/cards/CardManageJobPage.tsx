import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Switch } from "antd";
import {
  jobDeleteJobById,
  jobUpdateJobStatus,
} from "../../store/job/job-slice";
import { useDispatch } from "react-redux";
interface PropComponent {
  className?: string;
  onClickUpdateJob?: any;
  onClickListCandidate?: any;
  onClickSetJobId?: any;
  handleReset?: any;
  index?: any;
  item?: any;
}

const CardManageJobPage: React.FC<PropComponent> = ({
  className,
  onClickUpdateJob,
  onClickListCandidate,
  onClickSetJobId,
  handleReset,
  index,
  item,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">{index + 1}</TableRowContent>
        <TableRowContent className="">
          <a
            href={`https://jspace-fe.vercel.app/jobs/${item?.post?.id}`}
            target="_blank"
          >
            <div className="line-clamp-2 h-full font-medium">
              {item?.post?.title}
            </div>
          </a>
        </TableRowContent>
        <TableRowContent className="">{item?.post?.openDate}</TableRowContent>
        <TableRowContent className="">{item?.post?.closeDate}</TableRowContent>
        <TableRowContent className="">
          {/* Trong khoảng */}
          {item?.post?.minPay != "0" &&
          item?.post?.maxPay != "0" &&
          item?.post?.maxPay != "2147483647"
            ? `${item?.post?.minPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })} - ${item?.post?.maxPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
          {/* Lên tới */}
          {item?.post?.minPay == "0" && item?.post?.maxPay != "0"
            ? `Lên tới ${item?.post?.maxPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
          {/* Trên */}
          {item?.post?.minPay != "0" &&
          (item?.post?.maxPay == "2147483647" || item?.post?.maxPay == "0")
            ? `Trên ${item?.post?.minPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
        </TableRowContent>
        <TableRowContent className="">{item?.post?.quantity}</TableRowContent>
        <TableRowContent className="">{item?.post?.rank?.code}</TableRowContent>
        <TableRowContent className="">
          {item?.post?.experience?.language?.vi}
        </TableRowContent>
        <TableRowContent className="">
          {item?.post?.jobType?.code}
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-3">
            {item?.post?.skills?.length > 0 &&
              item?.post?.skills?.map((item: any, index: number) => (
                <span key={index} className="ml-2">
                  {item?.name}
                </span>
              ))}
          </div>
        </TableRowContent>

        {/*  */}
        <TableRowContent className="absolute right-[300px] z-10">
          <Popconfirm
            title="Xác nhận xóa công việc."
            description="Bạn có chắc chắn xóa công việc ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              dispatch(
                jobDeleteJobById({
                  job_id: item?.post?.id,
                  company_id: item?.post?.company?.id,
                })
              );
              handleReset();
            }}
            onCancel={() => {}}
          >
            <span className="px-3 py-1 bg-red-500 text-white rounded font-medium cursor-pointer hover:opacity-80 transition-all">
              Xóa
            </span>
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-56 z-10">
          <Popconfirm
            title="Cập nhật trạng thái công việc"
            description="Bạn có chắc cập nhật trạng thái ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              let status = "";
              if (item?.post?.postStatus?.value == "OPEN") status = "CLOSE";
              else status = "OPEN";
              dispatch(
                jobUpdateJobStatus({
                  job_id: item?.post?.id,
                  job_status: status,
                  company_id: item?.post?.company?.id,
                })
              );
            }}
            onCancel={() => {}}
          >
            <Switch
              value={item?.post?.postStatus?.value == "OPEN" ? true : false}
            />
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-28 z-10">
          <span
            onClick={() => {
              onClickUpdateJob(true);
              onClickSetJobId(item?.post?.id);
            }}
            className="py-1 px-2 text-sm rounded-sm bg-white text-primary font-medium cursor-pointer border border-solid border-primary"
          >
            Chỉnh sửa
          </span>
        </TableRowContent>
        <TableRowContent className="absolute right-2 z-10">
          <div className="relative">
            <span
              onClick={() => {
                onClickListCandidate(true);
                onClickSetJobId(item?.post?.id);
              }}
              className="py-1 px-2 text-sm rounded-sm bg-gray-200 shadow text-primary cursor-pointer font-medium"
            >
              Ứng viên
            </span>
            {item?.appliedCandidate != "0" && (
              <span className="absolute flex bg-green-100 rounded-lg h-6 w-6 -top-4 -right-3 text-green-500 font-medium">
                <span className="m-auto">{item?.appliedCandidate}</span>
              </span>
            )}
          </div>
        </TableRowContent>
      </TableRow>
    </>
  );
};

export default CardManageJobPage;
