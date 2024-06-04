import React, { useEffect, useState } from "react";
import IconClose from "../../components/icons/IconClose";
import { useDispatch, useSelector } from "react-redux";
import { productGetProductById } from "../../store/product/product-slice";
import IconCheck from "../../components/icons/IconCheck";
import { Skeleton } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { paymentRequestPayment } from "../../store/payment/payment-slice";
interface PropComponent {
  className?: string;
  productId?: string;
  onClick?: any;
}
const EmployerBuyNowProductPage: React.FC<PropComponent> = ({
  className,
  productId,
  onClick,
}) => {
  const { productById, loadingProduct } = useSelector(
    (state: any) => state.product
  );
  const { loadingPayment, payment } = useSelector(
    (state: any) => state.payment
  );
  const dispatch = useDispatch();
  const { companyAuth } = useSelector((state: any) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = "visible";
      };
    }
  }, []);
  useEffect(() => {
    if (productId) {
      dispatch(productGetProductById({ product_id: productId }));
    }
  }, []);

  useEffect(() => {
    let cal = quantity * productById?.price;
    setSum(cal);
  }, [productById, quantity]);
  useEffect(() => {
    if (payment?.links) {
      window.location.href = payment?.links[1]?.href;
    }
  }, [payment?.links]);
  const handlePayment = () => {
    dispatch(
      paymentRequestPayment({
        quantity: quantity,
        total: Math.floor(sum / 23000),
        productId: productId,
        companyId: companyAuth?.id,
      })
    );
  };

  return (
    <>
      <div className={`fixed z-20 inset-0 ${className}`}>
        <div
          onClick={() => onClick(false)}
          className={`fixed z-10 flex inset-0 bg-black/50 ${className}`}
        ></div>
        <div className="absolute inset-0 z-10 shadow-lg m-auto w-[35%] h-[53%] p-8 bg-white overflow-auto">
          <span
            className="absolute right-3 top-3 cursor-pointer hover:bg-gray-200 rounded-sm"
            onClick={() => onClick(false)}
          >
            <IconClose></IconClose>
          </span>

          {/* content */}
          <h2 className="font-bold text-xl">Thông tin đơn hàng</h2>
          {loadingProduct ? (
            <div className="mt-4">
              <Skeleton />
            </div>
          ) : (
            <div className="flex flex-col mt-5">
              <div className="flex items-center gap-5">
                <h3 className="text-xl font-semibold text-primary">
                  {productById?.name}
                </h3>
                <span className="font-medium text-xl">-</span>
                <p className="text-xl font-semibold">
                  {productById?.price?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                  <span className="text-red-500">*</span>
                </p>
              </div>
              <ul className="text-base mt-3">
                <li className="flex items-center gap-2 mt-2">
                  <IconCheck
                    className="text-primary"
                    classIcon="!w-5 !h-5"
                  ></IconCheck>
                  <span className="text-gray-600">
                    Số lượng bài đăng
                    <span className="font-bold">
                      {` ${productById?.numberOfPost} bài đăng`}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <IconCheck
                    className="text-primary"
                    classIcon="!w-5 !h-5"
                  ></IconCheck>
                  <span className="text-gray-600">
                    Thời gian sử dụng
                    <span className="font-bold">
                      {` ${productById?.durationDayNumber} ngày`}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2 mt-2">
                  <IconCheck
                    className="text-primary"
                    classIcon="!w-5 !h-5"
                  ></IconCheck>
                  <span className="text-gray-600">
                    Thời gian mỗi bài đăng
                    <span className="font-bold">
                      {` ${productById?.postDuration} ngày`}
                    </span>
                  </span>
                </li>
              </ul>
              <div className="mt-4">
                <h4 className="text-base font-medium">Chi tiết</h4>
                <p className="max-h-[90px] overflow-auto">
                  {productById?.description}
                </p>
              </div>

              <div className="absolute right-0 left-0 bottom-0 p-3  bg-white z-20">
                <div className="mb-4 flex gap-5">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-medium">Số lượng: </p>

                    <span
                      className="select-none"
                      onClick={() => {
                        if (quantity > 1) setQuantity(quantity - 1);
                      }}
                    >
                      <MinusOutlined className="p-1 bg-gray-200 rounded-sm cursor-pointer" />
                    </span>
                    <span className="mx-1">{quantity}</span>
                    <span
                      className="select-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <PlusOutlined className="p-1 bg-gray-200 rounded-sm cursor-pointer" />
                    </span>
                  </div>
                  <p className="text-base font-medium ">
                    Tổng tiền:
                    {` ${sum.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}`}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:opacity-80 transition-all"
                    onClick={() => onClick(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="grow w-full text-center px-4 py-2 bg-primary text-white font-medium rounded-md hover:opacity-80 transition-all"
                    onClick={handlePayment}
                    disabled={loadingPayment}
                  >
                    {loadingPayment ? (
                      <div className="flex">
                        <span className="m-auto w-5 h-5 border-2 border-t-transparent border-gray-200 border-solid rounded-full animate-spin"></span>
                      </div>
                    ) : (
                      <span>Thanh toán</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerBuyNowProductPage;
