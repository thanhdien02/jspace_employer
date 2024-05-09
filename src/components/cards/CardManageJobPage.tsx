import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Switch } from "antd";
interface PropComponent {
  className?: string;
  onClick?: any;
}
const CardManageJobPage: React.FC<PropComponent> = ({ className, onClick }) => {
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">12</TableRowContent>
        <TableRowContent className="">
          Senior Full-Stack Developer ( NodeJs , ReactJs)
        </TableRowContent>
        <TableRowContent className="">Thỏa thuận</TableRowContent>
        <TableRowContent className="">10</TableRowContent>
        <TableRowContent className="">Nhân viên</TableRowContent>
        <TableRowContent className="">Không yêu cầu</TableRowContent>
        <TableRowContent className="">Toàn thời gian</TableRowContent>
        <TableRowContent className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </TableRowContent>
        <TableRowContent className="">17/10/2024</TableRowContent>
        <TableRowContent className="">29/10/2024</TableRowContent>
        <TableRowContent className="">
          <Popconfirm
            title="Khóa tài khoản"
            description="Bạn có chắc khóa tài khoản ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {}}
            onCancel={() => {}}
          >
            <Switch checked={true} onChange={() => {}} />
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-28 z-10">
          <Popconfirm
            title="Khóa tài khoản"
            description="Bạn có chắc khóa tài khoản ?"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => {}}
            onCancel={() => {}}
          >
            <Switch checked={true} onChange={() => {}} />
          </Popconfirm>
        </TableRowContent>
        <TableRowContent className="absolute right-2 z-10">
          <span
            onClick={() => onClick(true)}
            className="p-1 text-sm rounded-sm bg-primary text-white cursor-pointer"
          >
            Chỉnh sửa
          </span>
        </TableRowContent>
      </TableRow>
    </>
  );
};

export default CardManageJobPage;
