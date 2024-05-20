import React, { useEffect, useState } from "react";
import IconTrash from "../../components/icons/IconTrash";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
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
  const [sumprice, setSumPrice] = useState(0);
  useEffect(() => {
    const sum = data?.price * data?.quantity;
    setSumPrice(sum);
  }, [data]);
  return (
    <tr className={`${className}`}>
      <td className="p-3">
        <input
          type="checkbox"
          onChange={() => {
            const datanew = listCheck?.map((item: any) =>
              item.id === data?.id
                ? { ...item, checkBox: !data?.checkBox }
                : item
            );
            onCheck(datanew);
          }}
          checked={data?.checkBox}
          className="cursor-pointer"
        />
      </td>
      <td className="p-3 max-w-[200px] text-sm">
        <div className="line-clamp-3">{data?.name}</div>
      </td>
      <td className="p-3 font-medium">
        {data?.price.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td className="p-3">
        <div className="flex gap-2">
          <PlusOutlined className="p-1 bg-gray-200 rounded-sm cursor-pointer" />
          <input
            type="text"
            className="w-[25px] px-2"
            defaultValue={data?.quantity}
          />
          <MinusOutlined className="p-1 bg-gray-200 rounded-sm cursor-pointer" />
        </div>
      </td>
      <td className="p-3 text-primary font-medium">
        {sumprice.toLocaleString("vi", { style: "currency", currency: "VND" })}
      </td>
      <td className="p-3">
        <IconTrash
          classIcon="!w-5 !h-5"
          className="text-red-500 cursor-pointer p-1 inline-block rounded-sm bg-red-100"
        ></IconTrash>
      </td>
    </tr>
  );
};

export default CardShoppingCartPage;
