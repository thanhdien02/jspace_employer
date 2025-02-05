import { message } from "antd";
import React from "react";

interface PropComponent {
  className?: string;
  item?: any;
}
const CardFindCandidatePage: React.FC<PropComponent> = ({
  className,
  item,
}) => {
  return (
    <>
      <div
        className={`flex flex-col min-h-[400px] h-[540px] w-full border border-solid border-gray-200 rounded-md hover:shadow-lg transition-all ${className}`}
      >
        <div className="relative w-full h-[30%] rounded-md">
          <img
            src={
              item?.user?.background
                ? item?.user?.background
                : "https://biz.prlog.org/jspace/logo.png"
            }
            alt=""
            className={`w-full h-full r rounded-t-md ${
              item?.user?.background ? "object-cover" : "object-contain"
            }`}
          />
          <img
            src={
              item?.user?.picture
                ? item?.user?.picture
                : "https://cdn.pixabay.com/photo/2024/04/06/09/18/highland-cow-8678950_1280.jpg"
            }
            alt=""
            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[75px] h-[75px] object-cover rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col h-max mt-[35px] p-3">
          <a
            className="block font-medium text-[17px] text-center cursor-pointer"
            href={`https://jspace-employer.vercel.app/information-candidate/${item?.user?.id}`}
            target="_blank"
          >
            {item?.user?.name}
          </a>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Email: </span>
              <span className="text-black font-sans">
                {item?.user?.email}
              </span>
            </li>
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Số điện thoại: </span>
              <span className="text-black font-sans">
                {item?.user?.phone}
              </span>
            </li>
            <li className="mt-[1px] text-sm pb-1 flex flex-nowrap">
              <span className="inline-block font-medium mr-4 text-nowrap">Địa điểm: </span>
              <div className="text-black font-sans line-clamp-1">
                {item?.profile?.location?.province} -{" "}
                {item?.profile?.detailAddress}
              </div>
            </li>
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Kinh nghiệm: </span>
              <span className="text-black font-sans">
                {item?.profile?.experience?.language?.vi}
              </span>
            </li>
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Cấp bậc: </span>
              <span className="text-black font-sans">
                {item?.profile?.rank?.language?.vi}
              </span>
            </li>
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Giới tính: </span>
              <span className="text-black font-sans">
                {item?.profile?.gender?.language?.vi}
              </span>
            </li>
            <li className="mt-[1px] text-sm pb-1">
              <span className="inline-block font-medium mr-4">Mức lương: </span>
              <span className="text-black font-sans">
                Từ{" "}
                {item?.profile?.minSalary?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
                -{" "}
                {item?.profile?.maxSalary?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </li>
          </ul>
          <div className="mt-auto grid grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() =>
                downloadFile(
                  item?.defaultResume?.file?.path,
                  item?.defaultResume?.file?.name
                )
              }
              className="px-4 py-2 text-primary bg-white font-medium rounded-md border border-solid border-primary hover:opacity-80 transition-all"
            >
              Tải CV
            </button>
            <a
              href={item?.defaultResume?.file?.path}
              target="_blank"
              className="block text-center px-4 py-2 text-white bg-primary font-medium rounded-md hover:opacity-80 transition-all"
            >
              Xem CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFindCandidatePage;
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
