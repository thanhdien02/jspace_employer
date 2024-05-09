import React from "react";
import TableHeader from "../table/TableHeader";
import TableHeaderContent from "../table/TableHeaderContent";
import { dataHeaderManageJob } from "../../utils/dataFetch";
interface PropComponent {
  className?: string;
}

const HeaderTableManageJobPage: React.FC<PropComponent> = ({ className }) => {
  return (
    <>
      <TableHeader className={`${className}`}>
        {dataHeaderManageJob?.length > 0 &&
          dataHeaderManageJob?.map((item: any, index: number) => (
            <TableHeaderContent
              title={item?.title}
              className={`w-[${item?.width}] ${
                item?.className ? item.className : ""
              }`}
              key={index}
            ></TableHeaderContent>
          ))}
      </TableHeader>
    </>
  );
};

export default HeaderTableManageJobPage;
