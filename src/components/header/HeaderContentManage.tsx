import React from "react";
interface PropComponent {
  className?: string;
  title?: string;
}
const HeaderContentManage: React.FC<PropComponent> = ({ className, title }) => {
  return (
    <>
      <div>
        <h2 className={`font-bold text-2xl text-gray-800 mb-8 ${className}`}>
          {title}
        </h2>
      </div>
    </>
  );
};

export default HeaderContentManage;
