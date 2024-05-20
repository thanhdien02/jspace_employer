import React from "react";
import IconCart from "../icons/IconCart";

interface PropComponent {
  className?: string;
}
const CardListProductPage: React.FC<PropComponent> = ({ className }) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full p-4 min-h-[250px] bg-white rounded-t-md shadow-md !border-t-[6px] border-solid border-primary ${className}`}
      >
        <h3 className="font-semibold text-xl">JSPACE TOP</h3>
        <p className="text-primary text-xl font-medium">
          7,500,000 VND<span className="text-red-500">*</span>
        </p>
        <p className="text-gray-500">
          Đăng tin tuyển dụng hiệu quả với vị trí nổi bật trong Việc làm tốt
          nhất, được sử dụng tính năng CV đề xuất kết hợp các dịch vụ cao cấp và
          được bảo hành với nhiều quyền lợi ưu tiên.
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 items-center">
          <button
            className="flex justify-center item-center gap-2 font-medium px-2 py-2 hover:opacity-80 transition-all rounded-md text-primary border border-primary border-solid"
            type="button"
          >
            <IconCart classIcon="!w-5 !h-5"></IconCart>
            <span className="text-start text-nowrap">Thêm vào giỏ</span>
          </button>
          <button
            className="py-2 rounded-md font-medium bg-primary text-white hover:opacity-80 transition-all"
            type="button"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default CardListProductPage;
