import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Switch } from "antd";
import { jobUpdateJobStatus } from "../../store/job/job-slice";
import { useDispatch } from "react-redux";
interface PropComponent {
  className?: string;
  onClickUpdateJob?: any;
  onClickListCandidate?: any;
  onClickSetJobId?: any;
  item?: any;
}

const CardManageJobPage: React.FC<PropComponent> = ({
  className,
  onClickUpdateJob,
  onClickListCandidate,
  onClickSetJobId,
  item,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">{item?.post?.id}</TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2 h-full">{item?.post?.title}</div>
        </TableRowContent>
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
          {item?.post?.experience?.code}
        </TableRowContent>
        <TableRowContent className="">
          {item?.post?.jobType?.code}
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-3">
            {item?.post?.skills?.length > 0 &&
              item?.post?.skills?.map((item: any, index: number) => (
                <span key={index} className="ml-2">
                  {item?.post?.name}
                </span>
              ))}
          </div>
        </TableRowContent>
        <TableRowContent className="">{item?.post?.openDate}</TableRowContent>
        <TableRowContent className="">{item?.post?.closeDate}</TableRowContent>
        {/*  */}
        <TableRowContent className="absolute right-60 z-10">
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
        <TableRowContent className="absolute right-32 z-10">
          <span
            onClick={() => {
              onClickUpdateJob(true);
              onClickSetJobId(item?.post?.id);
            }}
            className="py-1 px-2 text-sm rounded-sm bg-primary text-white cursor-pointer"
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
              className="py-1 px-2 text-sm rounded-sm bg-primary text-white cursor-pointer"
            >
              Xem ứng viên
            </span>
            {true ? (
              <span className="absolute flex bg-green-100 rounded-lg h-6 w-6 -top-4 -right-3 text-green-500 font-medium">
                <span className="m-auto">{item?.appliedCandidate}</span>
              </span>
            ) : (
              ""
            )}
          </div>
        </TableRowContent>
      </TableRow>
    </>
  );
};

export default CardManageJobPage;
