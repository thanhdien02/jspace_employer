import React from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardListProductPage from "../../components/cards/CardListProductPage";

const EmployerListProductPage: React.FC = () => {
  return (
    <>
      <div className="mx-10 my-5 bg-white px-10 pb-8 py-5 shadow-md">
        <HeaderContentManage title="Danh sách các dịch vụ để tăng khả năng tìm được ứng viên"></HeaderContentManage>
        <div className="h-[1px] bg-gray-200 w-full my-3"></div>
        <div className="mt-5 grid grid-cols-3 gap-10">
          <CardListProductPage></CardListProductPage>
          <CardListProductPage></CardListProductPage>
          <CardListProductPage></CardListProductPage>
          <CardListProductPage></CardListProductPage>
        </div>
      </div>
    </>
  );
};

export default EmployerListProductPage;
