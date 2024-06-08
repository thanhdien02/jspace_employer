import React from "react";
import TableRow from "../table/TableRow";
import TableRowContent from "../table/TableRowContent";
interface PropComponent {
  className?: string;
  onclick?: any;
  item?: any;
  onProductId?: any;
}
const ContentManageProductPage: React.FC<PropComponent> = ({
  className = "",
  onclick,
  item,
  onProductId,
}) => {
  return (
    <TableRow className={`${className}`}>
      <TableRowContent className="">{item?.id}</TableRowContent>
      <TableRowContent className="">
        <div className="line-clamp-2">{item?.name}</div>
      </TableRowContent>
      <TableRowContent className="">
        {item?.price?.toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })}
      </TableRowContent>
      <TableRowContent className="">{item?.numberOfPost} bài đăng</TableRowContent>
      <TableRowContent className="">
        {item?.durationDayNumber} ngày
      </TableRowContent>
      <TableRowContent className="">{item?.postDuration} ngày</TableRowContent>
      <TableRowContent className="">
        <span
          className="px-2 py-1 bg-primary text-white cursor-pointer"
          onClick={() => {
            onclick(true);
            onProductId(item?.id);
          }}
        >
          Chỉnh sửa
        </span>
      </TableRowContent>
    </TableRow>
  );
};

export default ContentManageProductPage;
