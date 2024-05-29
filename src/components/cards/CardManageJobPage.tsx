import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Switch } from "antd";
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
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">{item?.id}</TableRowContent>
        <TableRowContent className="line-clamp-3">
          <div className="line-clamp-2">{item?.title}</div>
        </TableRowContent>
        <TableRowContent className="">
          {/* Trong khoảng */}
          {item?.minPay != "0" &&
          item?.maxPay != "0" &&
          item?.maxPay != "2147483647"
            ? `${item?.minPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })} - ${item?.maxPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
          {/* Lên tới */}
          {item?.minPay == "0" && item?.maxPay != "0"
            ? `Lên tới ${item?.maxPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
          {/* Trên */}
          {item?.minPay != "0" && item?.maxPay == "2147483647"
            ? `Trên ${item?.minPay.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}`
            : ""}
        </TableRowContent>
        <TableRowContent className="">{item?.quantity}</TableRowContent>
        <TableRowContent className="">Nhân viên</TableRowContent>
        <TableRowContent className="">{item?.experience?.code}</TableRowContent>
        <TableRowContent className="">{item?.jobType?.code}</TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-3">
            {item?.skills?.length > 0 &&
              item?.skills?.map((item: any, index: number) => (
                <span key={index} className="ml-2">
                  {item?.name}
                </span>
              ))}
          </div>
        </TableRowContent>
        <TableRowContent className="">{item?.openDate}</TableRowContent>
        <TableRowContent className="">{item?.closeDate}</TableRowContent>
        {/*  */}
        <TableRowContent className="absolute right-60 z-10">
          <Popconfirm
            title="Khóa tài khoản"
            description="Bạn có chắc khóa tài khoản ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              // console.log("dữ liệu: ", item?.key);
            }}
            onCancel={() => {}}
          >
            <Switch checked={true} onChange={() => {}} />
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-32 z-10">
          <span
            onClick={() => {
              onClickUpdateJob(true);
              onClickSetJobId(item?.id);
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
                onClickSetJobId(item?.id);
              }}
              className="py-1 px-2 text-sm rounded-sm bg-primary text-white cursor-pointer"
            >
              Xem ứng viên
            </span>
            {true ? (
              <span className="absolute flex bg-green-100 rounded-lg h-6 w-6 -top-4 -right-3 text-green-500 font-medium">
                <span className="m-auto">10</span>
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
