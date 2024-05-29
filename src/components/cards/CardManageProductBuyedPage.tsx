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
        className={`flex flex-col gap-2 w-full p-4 min-h-[250px] bg-white rounded-t-md shadow-md !border-t-[6px] border-solid border-primary ${color} ${className}`}
      >
        <h3 className="font-semibold text-xl">
          {item?.purchasedProduct?.productName}
        </h3>
        <p className="text-primary text-xl font-medium">
          {item?.purchasedProduct?.totalPrice?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
          <span className="text-red-500">*</span>
        </p>
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
                {item?.purchasedProduct?.productDurationDayNumber} ngày
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
              <span className="font-bold">
                {" "}
                {item?.purchasedProduct?.productPostDuration} ngày
              </span>
            </span>
          </li>
        </ul>

        <div className="mb-4">
          <p className="font-medium text-base">* Chi tiết:</p>
          <p className="text-gray-500">{item?.purchasedProduct?.description}</p>
        </div>
      </div>
    </>
  );
};

export default CardManageProductBuyedPage;
