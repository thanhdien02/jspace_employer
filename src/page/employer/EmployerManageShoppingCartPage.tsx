import React, { useEffect, useState } from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardShoppingCartPage from "../../components/cards/CardShoppingCartPage";
import { Checkbox, CheckboxProps, Empty, message, Skeleton } from "antd";
import { dataCard } from "../../utils/dataFetch";
import { useDispatch, useSelector } from "react-redux";
import { cartGetCart } from "../../store/cart/cart-slice";
import { paymentRequestPaymentCart } from "../../store/payment/payment-slice";
import Loading from "../../components/loading/Loading";

const EmployerManageShoppingCartPage: React.FC = () => {
  const { loadingPayment, payment } = useSelector(
    (state: any) => state.payment
  );
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { carts, loadingCart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const [selectCheckAll, setSelectCheckAll] = useState(false);
  const [dataCheck, setDataCheck] = useState<any>([]);
  const [sumCart, setSumCart] = useState(0);
  useEffect(() => {
    if (carts?.length > 0) {
      const data: any = carts?.map((item: any) => ({
        ...item,
        checkBox: false,
      }));
      setDataCheck(data);
    } else if (carts?.length == 0) {
      setDataCheck([]);
    }
  }, [carts]);
  useEffect(() => {
    let sum = 0;
    if (selectCheckAll) {
      dataCheck?.forEach((element: any) => {
        if (element?.checkBox != true) {
          setSelectCheckAll(false);
        }
      });
    }
    dataCheck?.forEach((element: any) => {
      if (element?.checkBox == true) {
        sum += element?.product?.price * element?.quantity;
      }
    });
    setSumCart(sum);
  }, [dataCheck]);
  const handleSelectAll = () => {
    if (carts?.length > 0) {
      const data: any = carts?.map((item: any) => ({
        ...item,
        checkBox: !selectCheckAll,
      }));
      setDataCheck(data);
      setSelectCheckAll(!selectCheckAll);
    }
  };
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(cartGetCart({ company_id: companyAuth?.id, page: 1, size: 10 }));
    }
  }, [companyAuth]);
  const handlePaymentCart = () => {
    if (dataCheck?.length > 0) {
      let dataPayment = dataCheck
        ?.filter((item: any) => item.checkBox)
        .map((item: any) => item?.id);
      if (dataPayment?.length > 0) {
        // cartIds
        dispatch(
          paymentRequestPaymentCart({
            cartIds: dataPayment,
            total: Math.floor(sumCart / 23000),
          })
        );
      } else {
        message.info("Cần chọn sản phẩm để thành toán.");
      }
    } else {
      message.info("Cần chọn sản phẩm để thành toán.");
    }
  };
  useEffect(() => {
    if (payment?.links) {
      const decoded = decodeURI(payment?.links[1]?.href);
      window.location.href = decoded;
    }
  }, [payment?.links]);
  return (
    <>
      <div className="mx-10 my-10  rounded-lg">
        <HeaderContentManage title="Giỏ hàng của tôi"></HeaderContentManage>

        {dataCard?.length > 0 ? (
          <div className="flex gap-5">
            <div className="w-[70%] bg-white min-h-[200px] p-5 shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b-[1px] border-solid border-gray-200 pb-2 font-medium">
                    <th className="p-3 text-start">
                      <input
                        type="checkbox"
                        className="select-all cursor-pointer"
                        checked={selectCheckAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-3 text-start">Tên dịch vụ</th>
                    <th className="p-3 text-start">Đơn giá (VND)</th>
                    <th className="p-3 text-start">Số lượng</th>
                    <th className="p-3 text-start">Số tiền (VND)</th>
                    <th className="p-3 text-start">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCart ? (
                    <tr>
                      <td className="p-5 text-center" colSpan={6}>
                        <Skeleton active />
                      </td>
                    </tr>
                  ) : dataCheck?.length <= 0 ? (
                    <tr>
                      <td className="p-5 text-center " colSpan={6}>
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </td>
                    </tr>
                  ) : (
                    dataCheck?.length > 0 &&
                    dataCheck?.map((item: any) => (
                      <CardShoppingCartPage
                        key={item?.id}
                        data={item}
                        listCheck={dataCheck}
                        onCheck={setDataCheck}
                        className="even:bg-gray-300/30"
                      ></CardShoppingCartPage>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="w-[30%] bg-white p-5 shadow-md">
              <h3 className="text-primary font-semibold text-lg mb-5">
                Thông tin đơn hàng
              </h3>
              <div className="flex justify-between items-center font-medium border-solid border-b-[1px] border-gray-200 p-4">
                <span>Tổng giá trị đơn hàng</span>
                <span>
                  {sumCart.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center font-medium border-solid border-b-[1px] border-gray-200 p-4">
                <span>Tổng tiền chưa bao gồm VAT</span>
                <span>0 VND</span>
              </div>
              <div className="flex justify-between items-center font-medium border-solid border-b-[1px] border-gray-200 p-4">
                <span>VAT (8%)</span>
                <span>0 VND</span>
              </div>
              <div className="flex justify-between items-center font-medium border-solid border-b-[1px] border-gray-200 p-4">
                <span>Mã ưu đãi</span>
                <span className="cursor-pointer px-2 py-1 rounded-md border border-solid border-primary text-primary">
                  Chọn mã
                </span>
              </div>
              <div className="mt-5">
                <Checkbox
                  onChange={onChange}
                  className="text-gray-500 font-medium"
                >
                  Tôi đồng ý với
                  <span className="text-red-500">Điều khoản dịch vụ</span> của
                  JSPACE
                </Checkbox>
              </div>
              <button
                type="button"
                onClick={handlePaymentCart}
                className="px-4 py-2 bg-primary rounded-md w-full mt-5 text-white font-medium hover:opacity-90 transition-all"
                disabled={loadingPayment}
              >
                {loadingPayment ? <Loading></Loading> : <span>Thanh toán</span>}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white py-5">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EmployerManageShoppingCartPage;
