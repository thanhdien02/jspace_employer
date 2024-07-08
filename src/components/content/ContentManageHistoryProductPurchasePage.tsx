import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
import { convertDollarToVN, formatDate } from "../../utils/function-common";
interface PropComponent {
  className?: string;
  item?: any;
}
const ContentManageHistoryProductPurchasePage: React.FC<PropComponent> = ({
  className = "",
  item,
}) => {
  return (
    <TableRow className={`${className}`}>
      <TableRowContent className="">{item?.id}</TableRowContent>
      <TableRowContent className="">
        <div className="line-clamp-2">{item?.productName}</div>
      </TableRowContent>
      <TableRowContent className="">
        <div className="line-clamp-2">{item?.company?.name}</div>
      </TableRowContent>
      <TableRowContent className="">
        {item?.productPrice}$ /{" "}
        {convertDollarToVN(Number(item?.productPrice), 24000).toLocaleString(
          "vi",
          {
            style: "currency",
            currency: "VND",
          }
        )}
      </TableRowContent>
      <TableRowContent className="">
        {formatDate(item?.purchasedDate)}
      </TableRowContent>
      <TableRowContent className="">{item?.quantity} sản phẩm</TableRowContent>
      <TableRowContent className="">
        {item?.totalPrice}$ /{" "}
        {convertDollarToVN(Number(item?.totalPrice), 24000).toLocaleString(
          "vi",
          {
            style: "currency",
            currency: "VND",
          }
        )}
      </TableRowContent>
      <TableRowContent className="">{item?.paymentMethod}</TableRowContent>
    </TableRow>
  );
};

export default ContentManageHistoryProductPurchasePage;
