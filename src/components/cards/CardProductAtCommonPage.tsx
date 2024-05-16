import React from "react";
import IconCheck from "../icons/IconCheck";

const CardProductAtCommonPage: React.FC = () => {
  return (
    <>
      <div className="border border-gray-200 border-solid rounded-md">
        <div className="px-4 py-3 bg-gray-800 rounded-t-md border-t-4 border-solid border-primary">
          <h2 className="text-white font-semibold">JSPACE MAX</h2>
        </div>
        <div className="p-5  ">
          <div className="">
            <h3 className="text-primary text-xl font-bold">7,500,000 VNĐ</h3>
            <p className="text-sm mt-1">* Giá trên chưa bao gồm VAT</p>
          </div>
          <button
            className="w-full mt-3 px-4 py-2 rounded-md font-medium bg-primary text-white"
            type="button"
          >
            Liên hệ tư vấn
          </button>
          <div className="mt-5">
            <h4 className="text-base font-medium text-gray-600">
              QUYỀN LỢI ĐẶC BIỆT
            </h4>
            <ul className="mt-2">
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Hiển thị trong Box Việc làm tốt nhất
                </span>
              </li>
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Hiển thị trong Box Việc làm tốt nhất
                </span>
              </li>
              <li className="flex gap-2 mt-2">
                <IconCheck
                  className="text-primary"
                  classIcon="!w-5 !h-5"
                ></IconCheck>
                <span className="text-gray-600 text-sm">
                  Hiển thị trong Box Việc làm tốt nhất
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
