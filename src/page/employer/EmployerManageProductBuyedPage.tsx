import React, { useEffect } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardManageProductBuyedPage from "../../components/cards/CardManageProductBuyedPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetBuyedProduct } from "../../store/product/product-slice";
import { Empty, Skeleton } from "antd";

const EmployerManageProductBuyedPage: React.FC = () => {
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { loadingProduct, buyedProducts } = useSelector(
    (state: any) => state.product
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(productGetBuyedProduct({ company_id: companyAuth?.id }));
    }
  }, [companyAuth]);
  return (
    <>
      <div className="mx-16 my-5 bg-white p-10 shadow">
        <HeaderContentManage title="Danh sách dịch vụ đã mua"></HeaderContentManage>
        {loadingProduct ? (
          <Skeleton />
        ) : !buyedProducts?.length ? (
          <Empty />
        ) : (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {buyedProducts?.length > 0 &&
              buyedProducts?.map((item: any) => (
                <CardManageProductBuyedPage
                  item={item}
                  key={item?.purchasedProduct?.id}
                  // color="!border-pink-500"
                ></CardManageProductBuyedPage>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerManageProductBuyedPage;
