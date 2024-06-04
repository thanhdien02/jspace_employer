import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex">
      <span className="w-5 h-5  rounded-full m-auto animate-spin border-2 border-solid border-gray-200 border-t-transparent"></span>
    </div>
  );
};

export default Loading;
