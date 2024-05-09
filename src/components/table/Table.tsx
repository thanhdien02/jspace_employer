import React from "react";

interface PropComponent {
  children?: any;
  className?: string;
}
const Table: React.FC<PropComponent> = ({ children, className }) => {
  return <table className={`bg-white ${className}`}>{children}</table>;
};

export default Table;
