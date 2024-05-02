import React from "react";

interface PropComponent {
  className?: string;
  children?: any;
}
const TableRow: React.FC<PropComponent> = ({ className, children }) => {
  return (
    <>
      <tr className={`border-t border-gray-200 border-solid ${className}`}>{children}</tr>
    </>
  );
};

export default TableRow;
