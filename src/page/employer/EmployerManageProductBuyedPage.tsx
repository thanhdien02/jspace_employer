import React, { useEffect } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardManageProductBuyedPage from "../../components/cards/CardManageProductBuyedPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetBuyedProduct } from "../../store/product/product-slice";
import { Empty, Skeleton } from "antd";
import { dataColor } from "../../utils/dataFetch";

const EmployerManageProductBuyedPage: React.FC = () => {
  const { companyAuth, checkAuth } = useSelector((state: any) => state.auth);
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
        {!checkAuth?.verifiedByCompany ? (
          <Empty />
        ) : loadingProduct ? (
          <Skeleton />
        ) : !buyedProducts?.length ? (
          <Empty />
        ) : (
          <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
            {buyedProducts?.length > 0 &&
              buyedProducts?.map((item: any, index: number) => (
                <CardManageProductBuyedPage
                  item={item}
                  key={item?.purchasedProduct?.id}
                  color={`${
                    dataColor[index]?.id == index ? dataColor[index]?.color : ""
                  }`}
                ></CardManageProductBuyedPage>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployerManageProductBuyedPage;
