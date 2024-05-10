import React from "react";
import TableHeader from "../table/TableHeader";
import TableHeaderContent from "../table/TableHeaderContent";
interface PropComponent {
  className?: string;
  dataHeader?: any;
}

const HeaderTableManageJobPage: React.FC<PropComponent> = ({
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

export default HeaderTableManageJobPage;
