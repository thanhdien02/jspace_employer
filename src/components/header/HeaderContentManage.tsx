import React from "react";
interface PropComponent {
  className?: string;
  title?: string;
}
const HeaderContentManage: React.FC<PropComponent> = ({ className, title }) => {
  return (
    <>
      <div>
        <h2
          className={`font-bold text-lg my-3 text-gray-800 mb-5 ${className}`}
        >
          {title}
        </h2>
      </div>
    </>
  );
};

export default HeaderContentManage;
