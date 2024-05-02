import React from "react";
import { useSelector } from "react-redux";
import EmployerUpdateInformationCompanyPage from "./EmployerUpdateInformationCompanyPage";
import EmployerListCompanyForAccountSelectPage from "./EmployerListCompanyForAccountSelectPage";

const EmployerInformationCompanyPage: React.FC = () => {
  const { checkAuth } = useSelector((state: any) => state.auth);

  return (
    <>
      {checkAuth?.hasCompany ? (
        <EmployerUpdateInformationCompanyPage></EmployerUpdateInformationCompanyPage>
      ) : (
        <EmployerListCompanyForAccountSelectPage></EmployerListCompanyForAccountSelectPage>
      )}
    </>
  );
};

export default EmployerInformationCompanyPage;
