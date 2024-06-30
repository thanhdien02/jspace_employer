import React, { useEffect, useState } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardManageProductBuyedPage from "../../components/cards/CardManageProductBuyedPage";
import { useDispatch, useSelector } from "react-redux";
import { productGetBuyedProduct } from "../../store/product/product-slice";
import { Empty, Select, Skeleton } from "antd";
import { dataColor } from "../../utils/dataFetch";
import {
  paymentRequestConfirmPayment,
  paymentUpdateMessageRedux,
} from "../../store/payment/payment-slice";

const EmployerManageProductBuyedPage: React.FC = () => {
  const { companyAuth, checkAuth } = useSelector((state: any) => state.auth);
  const { loadingProduct, buyedProducts } = useSelector(
    (state: any) => state.product
  );
  const { messagePayment } = useSelector((state: any) => state.payment);
  const dispatch = useDispatch();
  const [expired, setExpired] = useState("unexpired");
  // const [size] = useState(6);
  // const [page, setPage] = useState(1);
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(
        productGetBuyedProduct({
          company_id: companyAuth?.id,
          durationFilter: expired,
        })
      );
    }
  }, [companyAuth]);
  useEffect(() => {
    if (companyAuth?.id && messagePayment === "paymentsuccess") {
      dispatch(
        productGetBuyedProduct({
          company_id: companyAuth?.id,
          durationFilter: expired,
        })
      );
      dispatch(paymentUpdateMessageRedux({ messagePayment: "" }));
    }
  }, [messagePayment]);
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const searchParams = new URLSearchParams(url.search);
    const mac: any = searchParams.get("mac");
    const paymentId: any = searchParams.get("paymentId");
    const PayerID: any = searchParams.get("PayerID");
    if (PayerID && paymentId && mac) {
      dispatch(
        paymentRequestConfirmPayment({
          mac: mac,
          paymentId: paymentId,
          PayerID: PayerID,
        })
      );
    }
  }, []);
  const handleChangeExpired = (e: any) => {
    console.log("object: ", e);
    setExpired(e);
    dispatch(
      productGetBuyedProduct({
        company_id: companyAuth?.id,
        durationFilter: e,
      })
    );
  };
  return (
    <>
      <div className="mx-16 my-5 bg-white p-10 shadow">
        <HeaderContentManage title="Danh sách dịch vụ đã mua"></HeaderContentManage>
        <div className="flex gap-5 items-center mb-5">
          <Select
            showSearch
            allowClear
            placeholder="Sản phẩn còn hạn & hết hạn"
            className="select w-[20%] text-base rounded-lg h-full bg-white"
            optionFilterProp="children"
            filterOption={(input: string, option: any) =>
              ((option?.label ?? "") as string)
                .toLowerCase()
                .includes((input ?? "").toLowerCase())
            }
            options={[
              { value: "unexpired", label: "Sản phẩm còn hạn sử dụng" },
              { value: "expired", label: "Sản phẩm hết hạn sử dụng" },
            ]}
            onChange={handleChangeExpired}
          />

          <button
            type="button"
            className="px-3 py-2 bg-primary rounded-md text-white font-medium hover:opacity-80 transition-all"
          >
            Tìm kiếm
          </button>
        </div>
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
