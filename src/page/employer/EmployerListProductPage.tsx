import React, { useEffect } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardListProductPage from "../../components/cards/CardListProductPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetProduct } from "../../store/product/product-slice";
import { Empty, Skeleton } from "antd";

const EmployerListProductPage: React.FC = () => {
  const { loadingProduct, products } = useSelector(
    (state: any) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productGetProduct({ page: 1, size: 10 }));
  }, []);
  return (
    <>
      <div className="mx-20 my-5 bg-white px-8 pb-8 py-5 shadow-md">
        <HeaderContentManage title="Danh sách các dịch vụ để tăng khả năng tìm được ứng viên"></HeaderContentManage>
        <div className="h-[1px] bg-gray-200 w-full my-3"></div>

        {loadingProduct ? (
          <Skeleton />
        ) : products?.length > 0 ? (
          <div className="mt-5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {products.map((item: any) => (
              <CardListProductPage
                key={item?.id}
                item={item}
              ></CardListProductPage>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Empty />
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerListProductPage;
