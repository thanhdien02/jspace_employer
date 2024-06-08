import React from "react";
import TableHeaderContent from "../table/TableHeaderContent";
import TableHeader from "../table/TableHeader";
interface PropComponent {
  className?: string;
  dataHeader?: any;
}
const HeaderTableManage: React.FC<PropComponent> = ({
  className,
  dataHeader,
}) => {
  return (
    <>
      <TableHeader className={`${className} w-full`}>
        {dataHeader?.length > 0 &&
          dataHeader?.map((item: any, index: number) => (
            <TableHeaderContent
              title={item?.title}
              className={`${item?.className ? item.className : ""}`}
              key={index}
            ></TableHeaderContent>
          ))}
      </TableHeader>
    </>
  );
};

export default HeaderTableManage;
