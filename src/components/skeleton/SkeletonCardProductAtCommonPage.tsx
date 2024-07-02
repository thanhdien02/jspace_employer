import React from "react";

const SkeletonCardProductAtCommonPage: React.FC = () => {
  return (
    <div
      className={`border border-gray-200 border-solid rounded-md animate-pulse h-[325px] shadow`}
    >
      <div className="px-4 py-3 h-[15%] bg-gray-200"></div>
      <div className="p-4 h-full">
        <div className="h-[15%]">
          <h3 className="bg-gray-200 h-1/2 rounded"></h3>
          <p className="bg-gray-200 w-1/2 mt-1 h-1/3 rounded"></p>
        </div>
        <button
          className="w-full mt-3 px-4 py-2 h-[19%] rounded-md font-medium bg-gray-200"
          type="button"
        ></button>
        <div className="mt-4 h-full">
          <h4 className="bg-gray-200 h-[9%] rounded"></h4>
          <ul className="h-full">
            <li className="flex gap-2 mt-2 bg-gray-200 h-[5%] rounded"></li>
            <li className="flex gap-2 mt-2 bg-gray-200 h-[8%] rounded"></li>
            <li className="flex gap-2 mt-2 bg-gray-200 h-[6%] rounded w-1/2"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCardProductAtCommonPage;
