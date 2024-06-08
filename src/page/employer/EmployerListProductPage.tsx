import React, { useEffect, useState } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardListProductPage from "../../components/cards/CardListProductPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetProduct } from "../../store/product/product-slice";
import { Empty, Pagination, Skeleton } from "antd";
import EmployerBuyNowProductPage from "./EmployerBuyNowProductPage";
import { dataColor } from "../../utils/dataFetch";

const EmployerListProductPage: React.FC = () => {
  const { loadingProduct, products, paginationProduct } = useSelector(
    (state: any) => state.product
  );
  const [checkBuyNow, setCheckBuyNow] = useState(false);
  const [productId, setProductId] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productGetProduct({ page: page, size: 6 }));
  }, [page]);
  return (
    <>
      <div className="mx-20 my-5 bg-white px-8 pb-8 py-5 shadow-md">
        <HeaderContentManage title="Danh sách các dịch vụ để tăng khả năng tìm được ứng viên"></HeaderContentManage>
        <div className="h-[1px] bg-gray-200 w-full my-3 border-green-500"></div>
        {loadingProduct ? (
          <Skeleton />
        ) : products?.length > 0 ? (
          <div className="mt-5 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
            {products.map((item: any, index: number) => (
              <CardListProductPage
                key={item?.id}
                item={item}
                onClick={setCheckBuyNow}
                onClickProductId={setProductId}
                color={`${
                  dataColor[index]?.id == index ? dataColor[index]?.color : ""
                }`}
              ></CardListProductPage>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[200px] w-full">
            <Empty />
          </div>
        )}
        <div className="mt-4 flex justify-end">
          {products.length <= 0 ? (
            <></>
          ) : (
            <Pagination
              total={paginationProduct?.totalElements}
              onChange={(e) => setPage(e)}
              className="inline-block"
              current={page}
              pageSize={paginationProduct?.pageSize}
            />
          )}
        </div>

        {/* by now */}
        {checkBuyNow ? (
          <EmployerBuyNowProductPage
            productId={productId}
            onClick={setCheckBuyNow}
          ></EmployerBuyNowProductPage>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default EmployerListProductPage;
