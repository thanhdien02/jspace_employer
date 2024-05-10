import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Switch } from "antd";
interface PropComponent {
  className?: string;
  onClickUpdateJob?: any;
  onClickListCandidate?: any;
  data?: any;
}

const CardManageJobPage: React.FC<PropComponent> = ({
  className,
  onClickUpdateJob,
  onClickListCandidate,
  data,
}) => {
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">12</TableRowContent>
        <TableRowContent className="line-clamp-3">
          <div className="line-clamp-3">
            Senior Full-Stack Developer ( NodeJs , ReactJs) Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Illum veritatis cupiditate
            optio Senior Full-Stack Developer ( NodeJs , ReactJs) Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Illum veritatis
            cupiditate optio Senior Full-Stack Developer ( NodeJs , ReactJs)
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            veritatis cupiditate optio
          </div>
        </TableRowContent>
        <TableRowContent className="">Thỏa thuận</TableRowContent>
        <TableRowContent className="">10</TableRowContent>
        <TableRowContent className="">Nhân viên</TableRowContent>
        <TableRowContent className="">Không yêu cầu</TableRowContent>
        <TableRowContent className="">Toàn thời gian</TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem
            ipsum
          </div>
        </TableRowContent>
        <TableRowContent className="">17/10/2024</TableRowContent>
        <TableRowContent className="">29/10/2024</TableRowContent>
        {/*  */}
        <TableRowContent className="absolute right-60 z-10">
          <Popconfirm
            title="Khóa tài khoản"
            description="Bạn có chắc khóa tài khoản ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {
              console.log("dữ liệu: ", data?.key);
            }}
            onCancel={() => {}}
          >
            <Switch checked={true} onChange={() => {}} />
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-32 z-10">
          <span
            onClick={() => onClickUpdateJob(true)}
            className="py-1 px-2 text-sm rounded-sm bg-primary text-white cursor-pointer"
          >
            Chỉnh sửa
          </span>
        </TableRowContent>
        <TableRowContent className="absolute right-2 z-10">
          <div className="relative">
            <span
              onClick={() => onClickListCandidate(true)}
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
