import React from "react";

interface PropComponent {
  className?: string;
  children?: any;
}
const TableHeader: React.FC<PropComponent> = ({ className, children }) => {
  return (
    <>
      <thead className={`rounded-md ${className}`}>
        <tr>{children}</tr>
      </thead>
    </>
  );
};

export default TableHeader;
