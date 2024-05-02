import React from "react";

interface PropComponent {
  children?: any;
}
const Table: React.FC<PropComponent> = ({ children }) => {
  return (
    <table className=" bg-white w-full">
      {children}
    </table>
  );
};

export default Table;
