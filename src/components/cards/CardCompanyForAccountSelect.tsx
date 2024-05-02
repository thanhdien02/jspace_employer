import React from "react";
import logo1 from "../../assets/logo3.png";
interface PropComponent {
  className?: string;
  companyName?: string;
  address?: string;
  companySize?: string;
  website?: string;
  logo?: string;
  onClickFill?: any;
}
const CardCompanyForAccountSelect: React.FC<PropComponent> = ({
  className = "",
  companyName = "",
  address = "",
  website = "",
  logo = "",
  companySize = "",
  onClickFill,
}) => {
  return (
    <>
      <div
        className={`flex items-center w-full m-auto gap-4 shadow-sm hover:shadow-md transition-all border border-gray-200 border-solid rounded-md h-[100px] p-5 ${className}`}
      >
        <img
          src={logo ? logo : logo1}
          className="w-[45px] h-[45px] rounded-full"
          alt=""
        />
        <div className=" grow">
          <h3 className="line-clamp-1 text-base font-semibold">
            {companyName}
          </h3>
          <p className="line-clamp-1 text-gray-500 text-sm mt-1">{address}</p>
          <div className="flex gap-4 items-center justify-between w-full">
            <p className="line-clamp-1 text-gray-500 text-xs">
              Quy mô: {companySize}
            </p>
            <p className="line-clamp-1 text-gray-500 text-xs">{website}</p>
          </div>
        </div>
        <div>
          <button
            onClick={onClickFill}
            className="font-medium text-primary p-1 hover:bg-primary hover:text-white bg-stone-200 rounded-md px-3 transition-all"
          >
            Chọn
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCompanyForAccountSelect;
