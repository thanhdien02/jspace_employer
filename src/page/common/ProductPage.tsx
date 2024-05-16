import React from "react";
import banner from "../../assets/banner-home2.jpg";
import CardProductAtCommonPage from "../../components/cards/CardProductAtCommonPage";
const ProductPage: React.FC = () => {
  return (
    <>
      <div>
        <img src={banner} className="w-full h-[300px] object-contain" alt="" />
      </div>
      <div className="w-primary mx-auto pt-5">
        <div className="flex gap-2 items-center">
          <span className="h-[35px] w-1 bg-primary"></span>
          <h2 className="grow text-2xl font-bold">Đăng tin tuyển dụng</h2>
        </div>
        <p className="text-gray-500 mt-1">
          Cộng hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển
          dụng của Doanh nghiệp
        </p>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <CardProductAtCommonPage></CardProductAtCommonPage>
          <CardProductAtCommonPage></CardProductAtCommonPage>
          <CardProductAtCommonPage></CardProductAtCommonPage>
          <CardProductAtCommonPage></CardProductAtCommonPage>
        </div>
        <div className="h-[200px]"></div>
      </div>
    </>
  );
};

export default ProductPage;
