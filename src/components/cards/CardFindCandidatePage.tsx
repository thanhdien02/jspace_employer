import React from "react";

interface PropComponent {
  className?: string;
}
const CardFindCandidatePage: React.FC<PropComponent> = ({ className }) => {
  return (
    <>
      <div
        className={`flex flex-col h-[400px] w-full border border-solid border-gray-200 ${className}`}
      >
        <div className="relative w-full h-[30%]">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/26/15/12/sunset-8657085_1280.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <img
            src="https://cdn.pixabay.com/photo/2024/04/06/09/18/highland-cow-8678950_1280.jpg"
            alt=""
            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[75px] h-[75px] object-cover rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col h-max mt-[35px] p-3">
          <h4 className="font-medium text-base">Tên: Nguyễn Thanh Điền</h4>
          <div className="mt-1 flex flex-col gap-[1px]">
            <p>
              Email: <span className="font-medium">thanhdien@gmail.com</span>
            </p>
            <p>
              Số điện thoại: <span className="font-medium">087718237</span>
            </p>
            <p>
              Địa chỉ: <span className="font-medium">Hồ Chí Minh</span>
            </p>
            <p>
              Kinh nghiệm: <span className="font-medium">1 năm</span>
            </p>
            <p>
              Mức lương: <span className="font-medium">10 - 15 triệu</span>
            </p>
            <p>
              Học vấn: <span className="font-medium">Đại học</span>
            </p>
          </div>
          <div className="mt-auto grid grid-cols-2 gap-5">
            <button
              type="button"
              className="px-4 py-2 text-white bg-primary font-medium"
            >
              Tải CV
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-primary font-medium"
            >
              Xem CV
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardFindCandidatePage;
