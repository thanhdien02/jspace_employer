import React, { useState } from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { Popconfirm, Popover } from "antd";
import TextArea from "antd/es/input/TextArea";
interface PropComponent {
  className?: string;
  onClickUpdateJob?: any;
  onClickListCandidate?: any;
  dataCandidateApply?: any;
}

const CardManageCandidateApplyJobPage: React.FC<PropComponent> = ({
  className,
  dataCandidateApply,
}) => {
  console.log("🚀 ~ dataCandidateApply:", dataCandidateApply);
  const [updateStatusCV, setUpdateStatusCV] = useState("spending");
  return (
    <>
      <TableRow className={`${className}`}>
        <TableRowContent className="">12</TableRowContent>
        <TableRowContent className="line-clamp-3">
          <Popover
            content={
              <p className="max-w-[300px] font-medium">
                {" "}
                Nguyen Thanh Dien Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Commodi repellat quos aspernatur minus, ipsa
                aperiam eveniet quis deserunt quod recusandae nihil in quasi sit
                reprehenderit facilis repudiandae? Eligendi, natus deserunt?
              </p>
            }
          >
            <div className="line-clamp-2">
              Nguyen Thanh Dien Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Commodi repellat quos aspernatur minus, ipsa
              aperiam eveniet quis deserunt quod recusandae nihil in quasi sit
              reprehenderit facilis repudiandae? Eligendi, natus deserunt?
            </div>
          </Popover>
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2">thanhdien@gmail.com</div>
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2">0907729422</div>
        </TableRowContent>
        <TableRowContent className="">
          <div className="line-clamp-2">
            <div className="flex items-center gap-2 ">
              <span
                onClick={() => {}}
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-primary text-white cursor-pointer"
              >
                Xem CV
              </span>
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
              SPENDING
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
