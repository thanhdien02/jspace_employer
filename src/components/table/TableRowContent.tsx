import React from "react";
interface PropComponent {
  className?: string;
  children?: any;
}
const TableRowContent: React.FC<PropComponent> = ({ className, children }) => {
  return (
    <>
      <td className={`px-4 py-3 ${className}`}>{children}</td>
    </>
  );
};

export default TableRowContent;
