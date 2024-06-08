import React, { useState } from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm } from "antd";
import TextArea from "antd/es/input/TextArea";
interface PropComponent {
  className?: string;
  onClickUpdateJob?: any;
  onClickListCandidate?: any;
  item?: any;
}

const CardManageCandidateApplyJobPage: React.FC<PropComponent> = ({
  className,
  item,
}) => {
  const [updateStatusCV, setUpdateStatusCV] = useState("spending");
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">12</TableRowContent>
        <TableRowContent className="line-clamp-3">
          {item?.candidate?.user?.name}
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2 h-full">
            {item?.candidate?.user?.email}
          </div>
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2">{item?.candidate?.user?.phone}</div>
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2">
            <div className="flex items-center gap-2 ">
              <a
                href={item?.resume?.file?.path}
                target="_blank"
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-primary text-white cursor-pointer"
              >
                Xem CV
              </a>
              <span
                onClick={() => {}}
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-primary text-white cursor-pointer"
              >
                Tải về
              </span>
            </div>
          </div>
        </TableRowContent>
        {/*  */}
        <TableRowContent className="">
          <div className="flex items-center gap-2 ">
            <span
              onClick={() => {}}
              className="py-1 px-2 text-sm rounded-sm bg-primary text-white"
            >
              {item?.applyStatus?.code}
            </span>
            <Popconfirm
              className=""
              title="Các lựa chọn cập nhật"
              description={
                <div
                  className={`py-2 transition-all duration-300 ${
                    updateStatusCV == "reject" || "approve" ? "w-[400px] " : ""
                  }`}
                >
                  <div className="flex gap-2 mt-1">
                    <span
                      onClick={() => setUpdateStatusCV("spending")}
                      className={`p-1 cursor-pointer hover:opacity-80 transition-all text-white bg-primary rounded-sm text-xs px-2 ${
                        updateStatusCV == "spending" ? "" : "opacity-40"
                      }`}
                    >
                      SPENDING
                    </span>
                    <span
                      onClick={() => setUpdateStatusCV("reject")}
                      className={`p-1 cursor-pointer  hover:opacity-80 transition-all text-white bg-red-500 rounded-sm text-xs px-2 ${
                        updateStatusCV == "reject" ? "" : "opacity-40"
                      }`}
                    >
                      REJECT
                    </span>
                    <span
                      onClick={() => setUpdateStatusCV("approve")}
                      className={`p-1 cursor-pointer hover:opacity-80 transition-all text-white bg-green-500 rounded-sm text-xs px-2 ${
                        updateStatusCV == "approve" ? "" : "opacity-40"
                      }`}
                    >
                      APPROVE
                    </span>
                  </div>
                  {updateStatusCV == "reject" ? (
                    <div className="mt-2">
                      <TextArea rows={4} placeholder="Lý do từ chối hồ sơ" />
                    </div>
                  ) : updateStatusCV == "approve" ? (
                    <div className="mt-2">
                      <TextArea
                        rows={4}
                        placeholder="Thông tin buổi phỏng vấn"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              }
              okText="Đồng ý"
              cancelText="Không"
              onConfirm={() => {
                if (updateStatusCV == "reject") {
                  <div className="fixed inset-0 bg-red-200 z-30">
                    Xin chao{" "}
                  </div>;
                }
              }}
              onCancel={() => {}}
            >
              <span
                onClick={() => {}}
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-primary text-white cursor-pointer"
              >
                Cập nhật
              </span>
            </Popconfirm>
          </div>
        </TableRowContent>
        <TableRowContent className="">
          <div className="">
            <span
              onClick={() => {}}
              className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-primary text-white cursor-pointer"
            >
              Hồ sơ chi tiết
            </span>
          </div>
        </TableRowContent>
      </TableRow>
    </>
  );
};

export default CardManageCandidateApplyJobPage;
