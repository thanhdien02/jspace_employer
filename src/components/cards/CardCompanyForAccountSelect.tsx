import React from "react";
import logo1 from "../../assets/logo3.png";
import { Popover } from "antd";
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
  logo = "",
  companySize = "",
  onClickFill,
}) => {
  return (
    <>
      <div
        className={`flex justify-between w-full items-center m-auto gap-4 shadow-sm hover:shadow-md transition-all border border-gray-200 border-solid rounded-md h-[100px] p-5 ${className}`}
      >
        <div className="w-[80px] h-[60px]">
          <img
            src={logo ? logo : logo1}
            className=" w-full h-full rounded-md object-cover"
            alt=""
          />
        </div>
        <div className="w-[65%]">
          <Popover
            content={<p className="max-w-[300px] font-medium">{companyName}</p>}
          >
            <h3 className="line-clamp-1 text-base font-semibold cursor-pointer">
              {companyName}
            </h3>
          </Popover>

          <Popover
            content={<p className="max-w-[300px] font-medium">{address}</p>}
          >
            <p className="line-clamp-1 text-gray-500 text-sm mt-1 cursor-default">{address}</p>
          </Popover>

          <div className="mt-1 flex gap-4 items-center justify-between w-full">
            <p className="line-clamp-1 text-gray-500 text-xs min-w-[40%]">
              Quy mô: {companySize}
            </p>
          </div>
        </div>
        <div className="w-[15%]">
          <button
            onClick={onClickFill}
            className="font-medium w-full text-primary p-1 hover:bg-primary hover:text-white bg-stone-200 rounded-md px-3 transition-all"
          >
            Chọn
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCompanyForAccountSelect;
