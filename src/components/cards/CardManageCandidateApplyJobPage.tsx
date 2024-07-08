import React, { useEffect, useState } from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { message, Popconfirm } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch } from "react-redux";
import { candidateUpdateStatusAppliedCandidate } from "../../store/candidate/candidate-slice";
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
  const dispatch = useDispatch();
  const [updateStatusCV, setUpdateStatusCV] = useState("progress");
  const [notificationApprove, setNotificationApprove] = useState<any>(null);
  const [notificationReject, setNotificationReject] = useState<any>(null);
  const handleChangeApproveNotification = (e: any) => {
    setNotificationApprove(e?.target?.value);
  };
  const handleChangeRejectNotification = (e: any) => {
    setNotificationReject(e?.target?.value);
  };
  useEffect(() => {
    if (item?.applyStatus?.value == "APPROVE") {
      setUpdateStatusCV("approve");
      setNotificationApprove(item?.note);
    } else if (item?.applyStatus?.value == "REJECT") {
      setUpdateStatusCV("reject");
      setNotificationApprove(item?.note);
    }
  }, []);
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
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-white text-primary border border-solid border-primary cursor-pointer text-nowrap"
              >
                Xem CV
              </a>
              <span
                onClick={() => {
                  downloadFile(
                    item?.resume?.file?.path,
                    item?.resume?.file?.name
                  );
                }}
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-gray-200 text-primary border border-solid border-transparent font-medium text-nowrap cursor-pointer"
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
              className={`py-1 px-2 text-sm rounded-sm text-white min-w-[70px] text-center ${
                item?.applyStatus?.value == "REJECT"
                  ? "bg-red-500"
                  : item?.applyStatus?.value == "APPROVE"
                  ? "bg-green-500"
                  : "bg-primary"
              }`}
            >
              {item?.applyStatus?.code}
            </span>
            <Popconfirm
              title="Các lựa chọn cập nhật"
              description={
                <div
                  className={`py-2 transition-all duration-300 ${
                    updateStatusCV == "reject" || "approve" ? "w-[400px] " : ""
                  }`}
                >
                  <div className="flex gap-2 mt-1">
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
                      <TextArea
                        rows={4}
                        value={notificationReject}
                        placeholder="Lý do từ chối hồ sơ"
                        onChange={handleChangeRejectNotification}
                      />
                    </div>
                  ) : updateStatusCV == "approve" ? (
                    <div className="mt-2">
                      <TextArea
                        rows={4}
                        value={notificationApprove}
                        placeholder="Thông tin buổi phỏng vấn"
                        onChange={handleChangeApproveNotification}
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
                let applyStatus = null,
                  notification = null;
                if (updateStatusCV == "reject") {
                  applyStatus = "REJECT";
                  notification = notificationReject;
                } else if (updateStatusCV == "approve") {
                  applyStatus = "APPROVE";
                  notification = notificationApprove;
                }
                dispatch(
                  candidateUpdateStatusAppliedCandidate({
                    postId: item?.post?.id,
                    candidateId: item?.candidate?.user?.id,
                    applyStatus: applyStatus,
                    notification: notification,
                  })
                );
              }}
              onCancel={() => {
                setUpdateStatusCV("");
              }}
            >
              <span
                onClick={() => {}}
                className="py-1 px-2 text-sm rounded-sm hover:opacity-80 transition-all bg-gray-200 text-primary shadow font-medium cursor-pointer"
              >
                Cập nhật
              </span>
            </Popconfirm>
          </div>
        </TableRowContent>
      </TableRow>
    </>
  );
};

export default CardManageCandidateApplyJobPage;

async function downloadFile(url: string, nameFile: string) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileHandle: FileSystemFileHandle = await (
      window as any
    ).showSaveFilePicker({
      suggestedName: nameFile,
      types: [
        {
          description: "File",
          accept: { "*/*": [".pdf", ".txt", ".jpg", ".png"] },
        },
      ],
    });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();

    message.success("Tải xuống thành công !");
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
