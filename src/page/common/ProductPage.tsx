import React, { useEffect } from "react";
import banner from "../../assets/banner-home2.jpg";
import CardProductAtCommonPage from "../../components/cards/CardProductAtCommonPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetProduct } from "../../store/product/product-slice";
const ProductPage: React.FC = () => {
  const { products } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productGetProduct({ page: 1, size: 10 }));
  }, []);
  return (
    <>
      <div>
        <img src={banner} className="w-full h-[300px] object-contain" alt="" />
      </div>
      <div className="w-primary max-w-full mx-auto pt-5">
        <div className="flex gap-2 items-center">
          <span className="h-[35px] w-1 bg-primary"></span>
          <h2 className="grow text-2xl font-bold">Đăng tin tuyển dụng</h2>
        </div>
        <p className="text-gray-500 mt-1">
          Cộng hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển
          dụng của Doanh nghiệp
        </p>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-5 mt-5">
          {products?.length > 0 &&
            products?.map((item: any) => (
              <CardProductAtCommonPage
                key={item?.id}
                item={item}
              ></CardProductAtCommonPage>
            ))}
        </div>
        <div className="h-[200px]"></div>
      </div>
    </>
  );
};

export default ProductPage;
