import React from "react";
import IconCart from "../icons/IconCart";
import IconCheck from "../icons/IconCheck";
import { useDispatch, useSelector } from "react-redux";
import { cartAddToCart } from "../../store/cart/cart-slice";
import { useNavigate } from "react-router-dom";
import { convertDollarToVN } from "../../utils/function-common";

interface PropComponent {
  className?: string;
  color?: string;
  item?: any;
  onClick?: any;
  onClickProductId?: any;
}
const CardListProductPage: React.FC<PropComponent> = ({
  className,
  color,
  item,
}) => {
  const { companyAuth } = useSelector((state: any) => state.auth);
  const { loadingCart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCartAddToCart = () => {
    dispatch(
      cartAddToCart({
        companyId: companyAuth?.id,
        productId: item?.id,
        quantity: 1,
      })
    );
  };
  const handleBuyNow = () => {
    dispatch(
      cartAddToCart({
        companyId: companyAuth?.id,
        productId: item?.id,
        quantity: 1,
      })
    );
    navigate("/manage/shopping-cart");
  };
  return (
    <>
      <div
        className={`flex flex-col gap-2 w-full p-4 min-h-[250px] bg-white shadow-md !border-t-[6px] border-solid border-black hover:shadow-xl transition-all ${color} ${className}`}
      >
        <h3 className="font-semibold text-xl">{item?.name}</h3>
        <p className="text-red-500 text-xl font-medium">
          {item?.price}$ /{" "}
          {convertDollarToVN(Number(item?.price), 24000).toLocaleString(
            "vi",
            {
              style: "currency",
              currency: "VND",
            }
          )}
          <span className="text-red-500">*</span>
        </p>
        <ul className="">
          <li className="flex gap-2 mt-2">
            <IconCheck
              className="text-green-400"
              classIcon="!w-5 !h-5"
            ></IconCheck>
            <span className="text-gray-600 text-sm">
              Số lượng bài đăng{" "}
              <span className="font-bold"> {item?.numberOfPost} bài đăng</span>
            </span>
          </li>
          <li className="flex gap-2 mt-2">
            <IconCheck
              className="text-green-400"
              classIcon="!w-5 !h-5"
            ></IconCheck>
            <span className="text-gray-600 text-sm">
              Thời gian sử dụng{" "}
              <span className="font-bold">{item?.durationDayNumber} ngày</span>
            </span>
          </li>
          <li className="flex gap-2 mt-2">
            <IconCheck
              className="text-green-400"
              classIcon="!w-5 !h-5"
            ></IconCheck>
            <span className="text-gray-600 text-sm">
              Thời gian mỗi bài đăng
              <span className="font-bold"> {item?.postDuration} ngày</span>
            </span>
          </li>
        </ul>

        <div className="mb-4">
          <p className="font-medium text-base">* Chi tiết:</p>
          <p className="text-gray-500 line-clamp-3">{item?.description}</p>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 items-center">
          <button
            className="flex justify-center item-center gap-2 font-medium px-2 py-2 hover:opacity-80 transition-all rounded-md text-primary border border-primary border-solid"
            type="button"
            onClick={handleCartAddToCart}
            disabled={loadingCart}
          >
            {loadingCart ? (
              <div className="flex ">
                <span className="m-auto w-5 h-5 rounded-full border-t-transparent border-2 border-solid border-primary  animate-spin"></span>
              </div>
            ) : (
              <>
                <IconCart classIcon="!w-5 !h-5"></IconCart>
                <span className="text-start text-nowrap">Thêm vào giỏ</span>
              </>
            )}
          </button>
          <button
            className="py-2 rounded-md font-medium bg-primary text-white hover:opacity-80 transition-all"
            type="button"
            onClick={handleBuyNow}
          >
            Mua ngay
          </button>
        </div>
      </div>
    </>
  );
};

export default CardListProductPage;
