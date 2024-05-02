import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import EmployerUpdateInformationCompanyPage from "./EmployerUpdateInformationCompanyPage";
import EmployerListCompanyForAccountSelectPage from "./EmployerListCompanyForAccountSelectPage";
import { useNavigate } from "react-router-dom";

const EmployerInformationCompanyPage: React.FC = () => {
  const { checkAuth } = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (checkAuth?.hasCompany) {
      navigate(`/manage/update-information-company/updatecompany`);
    }
  }, []);
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
