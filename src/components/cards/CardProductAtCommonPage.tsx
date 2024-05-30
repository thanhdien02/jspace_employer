import React from "react";
import IconCheck from "../icons/IconCheck";
interface PropComponent {
  className?: string;
  item?: any;
}
const CardProductAtCommonPage: React.FC<PropComponent> = ({
  className,
  item,
}) => {
  return (
    <>
      <div
        className={`border border-gray-200 border-solid rounded-md ${className}`}
      >
        <div className="px-4 py-3 bg-gray-800 rounded-t-md border-t-4 border-solid border-primary">
          <h2 className="text-white font-semibold">{item?.name}</h2>
        </div>
        <div className="p-5  ">
          <div className="">
            <h3 className="text-primary text-xl font-bold">
              {item?.price?.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </h3>
            <p className="text-sm mt-1">* Giá trên chưa bao gồm VAT</p>
          </div>
          <button
            className="w-full mt-3 px-4 py-2 rounded-md font-medium bg-primary text-white"
            type="button"
            onClick={() =>
              (window.location.href = "https://m.me/267479709792373")
            }
          >
            Liên hệ tư vấn
          </button>
          <div className="mt-5">
            <h4 className="text-base font-medium text-gray-600">
              QUYỀN LỢI ĐẶC BIỆT
            </h4>
            <ul className="">
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Số lượng bài đăng{" "}
                  <span className="font-bold">
                    {" "}
                    {item?.numberOfPost} bài đăng
                  </span>
                </span>
              </li>
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Thời gian sử dụng{" "}
                  <span className="font-bold">
                    {item?.durationDayNumber} ngày
                  </span>
                </span>
              </li>
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Thời gian mỗi bài đăng
                  <span className="font-bold"> {item?.postDuration} ngày</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProductAtCommonPage;
