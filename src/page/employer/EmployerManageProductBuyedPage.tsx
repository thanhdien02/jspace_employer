import React from "react";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import CardManageProductBuyedPage from "../../components/cards/CardManageProductBuyedPage";

const EmployerManageProductBuyedPage: React.FC = () => {
  return (
    <>
      <div className="mx-16 my-5 bg-white p-10 shadow">
        <HeaderContentManage title="Danh sách dịch vụ đã mua"></HeaderContentManage>
        <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
          <CardManageProductBuyedPage color="!border-pink-500"></CardManageProductBuyedPage>
          <CardManageProductBuyedPage color="!border-red-500"></CardManageProductBuyedPage>
          <CardManageProductBuyedPage color="!border-green-500"></CardManageProductBuyedPage>
          <CardManageProductBuyedPage color="!border-yellow-500"></CardManageProductBuyedPage>
        </div>
      </div>
    </>
  );
};

export default EmployerManageProductBuyedPage;
