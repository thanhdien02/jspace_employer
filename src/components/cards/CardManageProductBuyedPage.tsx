import React from "react";
import IconCheck from "../icons/IconCheck";
interface PropComponent {
  className?: string;
  color?: string;
  item?: any;
}
const CardManageProductBuyedPage: React.FC<PropComponent> = ({
  className,
  color,
  item,
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full p-4 min-h-[250px] bg-white  shadow-md !border-t-[6px] border-solid border-slate-800 hover:shadow-xl transition-all ${color} ${className}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-xl">
            {item?.purchasedProduct?.productName}
          </h3>
          <span>-</span>
          <p className="text-primary text-lg font-medium">
            {item?.purchasedProduct?.productPrice?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
            <span className="text-red-500">*</span>
            <span className="text-sm">/sp</span>
          </p>
        </div>
        <div className="flex gap-4 items-center justify-between">
          <p className="text-xl text-red-500 font-medium">
            <span className="text-base"> Tổng: </span>
            {item?.purchasedProduct?.totalPrice?.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <span className="text-base">
            {item?.purchasedProduct?.quantity} sản phẩm
          </span>
        </div>
        <ul className="">
          <li className="flex gap-2 mt-2">
            <IconCheck
              className="text-primary"
              classIcon="!w-5 !h-5"
            ></IconCheck>
            <span className="text-gray-600 text-sm">
              Số lượng bài đăng còn lại{" "}
              <span className="font-bold">
                {" "}
                {item?.purchasedProduct?.productNumberOfPost} bài đăng
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
                {item?.purchasedProduct?.productDurationDayNumber}
              </span>{" "}
              ngày từ ngày mua
            </span>
          </li>
          <li className="flex gap-2 mt-2">
            <IconCheck
              className="text-primary"
              classIcon="!w-5 !h-5"
            ></IconCheck>
            <span className="text-gray-600 text-sm">
              Thời gian mỗi bài đăng
              <span className="font-bold">
                {" "}
                {item?.purchasedProduct?.productPostDuration}
              </span>{" "}
              ngày từ ngày đăng
            </span>
          </li>
        </ul>
        <p className="text-base">
          <span className="text-sm">Ngày hết hạn:</span>
          <span className="font-medium">
            {" "}
            {item?.purchasedProduct?.expiryDate}
          </span>{" "}
          - <span className="text-sm">còn lại </span>
          <strong className="text-red-500">
            {item?.remainingDate != "0" ? item?.remainingDate : "0"} ngày
          </strong>{" "}
        </p>

        <div className="mb-2">
          <p className="font-medium text-base">* Chi tiết:</p>
          <p className="text-gray-500 line-clamp-3">
            {item?.purchasedProduct?.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default CardManageProductBuyedPage;
