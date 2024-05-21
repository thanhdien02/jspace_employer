import React from "react";
interface PropComponent {
  className?: string;
  color?: string;
}
const CardManageProductBuyedPage: React.FC<PropComponent> = ({
  className,
  color,
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full p-4 min-h-[250px] bg-white rounded-md shadow !border-t-[6px] border-solid border-primary ${color} ${className}`}
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
        <div className="mt-auto gap-2 items-center">
          <button
            className="w-full py-2 rounded-md font-medium bg-primary text-white hover:opacity-80 transition-all"
            type="button"
          >
            Chi tiết
          </button>
        </div>
      </div>
    </>
  );
};

export default CardManageProductBuyedPage;
