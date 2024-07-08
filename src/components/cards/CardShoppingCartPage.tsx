import React, { useEffect, useState } from "react";
import IconTrash from "../../components/icons/IconTrash";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { cartDeleteCart, cartUpdateCart } from "../../store/cart/cart-slice";
import { convertDollarToVN } from "../../utils/function-common";
interface PropComponent {
  className?: string;
  checkBox?: boolean;
  onCheck?: any;
  listCheck?: any;
  data?: any;
}
const CardShoppingCartPage: React.FC<PropComponent> = ({
  className,
  onCheck,
  listCheck,
  data,
}) => {
  const { companyAuth } = useSelector((state: any) => state.auth);
  const [sumprice, setSumPrice] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.quantity) {
      const sum = data?.product?.price * data?.quantity;
      setSumPrice(sum);
    }
  }, [data]);
  const handleUpdateProductQuantity = (e: string) => {
    if (e == "plus") {
      dispatch(
        cartUpdateCart({
          cart_id: data?.id,
          quantity: data?.quantity + 1,
          company_id: companyAuth?.id,
        })
      );
    } else {
      if (data?.quantity != 1)
        dispatch(
          cartUpdateCart({
            cart_id: data?.id,
            quantity: data?.quantity - 1,
            company_id: companyAuth?.id,
          })
        );
      else {
        dispatch(
          cartDeleteCart({
            cart_id: data?.id,
            company_id: companyAuth?.id,
          })
        );
      }
    }
  };
  const handleDeleteCartItem = () => {
    dispatch(
      cartDeleteCart({
        cart_id: data?.id,
        company_id: companyAuth?.id,
      })
    );
  };
  return (
    <tr className={`${className}`}>
      <td className="p-3">
        <input
          type="checkbox"
          onChange={() => {
            if (listCheck?.length > 0) {
              const datanew = listCheck?.map((item: any) =>
                item.id === data?.id
                  ? { ...item, checkBox: !data?.checkBox }
                  : item
              );
              onCheck(datanew);
            }
          }}
          checked={data?.checkBox}
          className="cursor-pointer"
        />
      </td>
      <td className="p-3 max-w-[200px] text-sm">
        <div className="line-clamp-3">{data?.product?.name}</div>
      </td>
      <td className="p-3 font-medium">
        {data?.product?.price}$ /{" "}
        {convertDollarToVN(Number(data?.product?.price), 24000).toLocaleString(
          "vi",
          {
            style: "currency",
            currency: "VND",
          }
        )}
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <span
            className="p-1 bg-gray-200 rounded-sm cursor-pointer"
            onClick={() => handleUpdateProductQuantity("plus")}
          >
            <PlusOutlined />
          </span>
          <input
            type="text"
            className="w-[25px] px-2"
            value={data?.quantity ? data?.quantity : ""}
            onChange={() => {}}
          />
          <span
            className="p-1 bg-gray-200 rounded-sm cursor-pointer"
            onClick={() => handleUpdateProductQuantity("minus")}
          >
            <MinusOutlined />
          </span>
        </div>
      </td>
      <td className="p-3 text-primary font-medium">
        {sumprice}$ /{" "}
        {convertDollarToVN(Number(sumprice), 24000).toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td className="p-3">
        <span
          onClick={handleDeleteCartItem}
          className="text-red-500 cursor-pointer p-1 inline-block rounded-sm bg-red-100"
        >
          <IconTrash classIcon="!w-5 !h-5"></IconTrash>
        </span>
      </td>
    </tr>
  );
};

export default CardShoppingCartPage;
