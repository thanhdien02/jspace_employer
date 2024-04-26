import React from "react";
import logo from "../../assets/logo3.png";
interface PropComponent {
  className?: string;
  companyName?: string;
  address?: string;
  scale?: string;
  website?: string;
}
const CardCompanyForAccountSelect: React.FC<PropComponent> = ({
  className = "",
}) => {
  return (
    <>
      <div
        className={`flex items-center w-full m-auto gap-4 shadow-sm hover:shadow-md transition-all border border-gray-200 border-solid rounded-md h-[100px] p-5 ${className}`}
      >
        <img src={logo} className="w-[45px] h-[45px] rounded-full" alt="" />
        <div className=" grow">
          <h3 className="line-clamp-1 text-base font-semibold">
            Công ty cổ phần fpt Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Enim repellat sit alias labore consectetur
            eligendi repudiandae obcaecati ducimus dolorem error iusto,
            consequatur blanditiis natus a amet, nobis similique recusandae
            maxime!
          </h3>
          <p className="line-clamp-1 text-gray-500 text-sm mt-1">
            Địa chỉ Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Provident optio maiores praesentium commodi voluptates numquam,
            delectus consectetur, doloribus aliquid error, amet in iusto dicta!
            Autem odio rem accusantium saepe ipsam.
          </p>
          <div className="flex gap-4 items-center justify-between w-full">
            <p className="line-clamp-1 text-gray-500 text-xs">
              Quy mô: 1-19 nhân viên
            </p>
            <p className="line-clamp-1 text-gray-500 text-xs">
              https://www.topcv.vn/cong-ty
            </p>
          </div>
        </div>
        <div>
          <button className="font-medium text-primary p-1 hover:bg-primary hover:text-white bg-stone-200 rounded-md px-3 transition-all">
            Chọn
          </button>
        </div>
      </div>
    </>
  );
};

export default CardCompanyForAccountSelect;
