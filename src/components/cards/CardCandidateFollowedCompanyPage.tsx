import React from "react";

interface PropComponent {
  className?: string;
  item?: any;
}
const CardCandidateFollowedCompanyPage: React.FC<PropComponent> = ({
  className,
  item,
}) => {
  return (
    <>
      <div
        className={`flex flex-col h-[320px] w-full border border-solid border-gray-200 rounded-md hover:shadow-lg transition-all ${className}`}
      >
        <div className="relative w-full h-[30%] rounded-md">
          <img
            src={item?.background}
            alt=""
            className="w-full h-full object-cover rounded-t-md"
          />
          <img
            src={
              item?.picture
                ? item?.picture
                : "https://cdn.pixabay.com/photo/2024/04/06/09/18/highland-cow-8678950_1280.jpg"
            }
            alt=""
            className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[75px] h-[75px] object-cover rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col h-max mt-[35px] p-3">
          <h4 className="font-medium text-[17px] text-center">{item?.name}</h4>
          <ul className="mt-2 flex flex-col gap-2">
            <li className="mt-[1px] text-gray-600 text-sm pb-1">
              <span className="inline-block mr-4">Email: </span>
              <span className="text-black font-medium font-sans">
                {item?.email}
              </span>
            </li>
            <li className="mt-[1px] text-gray-600 text-sm pb-1">
              <span className="inline-block mr-4">Số điện thoại: </span>
              <span className="text-black font-medium font-sans">
                {item?.phone}
              </span>
            </li>
          </ul>
          <div className="mt-auto grid grid-cols-2 gap-5">
            <button
              type="button"
              className="px-4 py-2 text-primary bg-white font-medium rounded-md border border-solid border-primary hover:opacity-80 transition-all"
            >
              Tải CV
            </button>
            <button
              type="button"
              className="px-4 py-2 text-white bg-primary font-medium rounded-md hover:opacity-80 transition-all"
            >
              Xem CV
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCandidateFollowedCompanyPage;
