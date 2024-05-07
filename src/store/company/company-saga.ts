import { takeLatest } from "redux-saga/effects";
import {
  companyCreateCompany,
  companyGetCompany,
  companyGetCompanyById,
  companyUpdateBackgroundCompany,
  companyUpdateLogoCompany,
} from "./company-slice";
import {
  handleCompanyCreateCompany,
  handleCompanyGetCompany,
  handleCompanyGetCompanyById,
  handleCompanyUpdateBackgroundCompany,
  handleCompanyUpdateLogoCompany,
} from "./company-handlers";

export default function* adminSaga() {
  yield takeLatest(companyCreateCompany.type, handleCompanyCreateCompany);
  yield takeLatest(companyGetCompany.type, handleCompanyGetCompany);
  yield takeLatest(companyGetCompanyById.type, handleCompanyGetCompanyById);
  yield takeLatest(
    companyUpdateBackgroundCompany.type,
    handleCompanyUpdateBackgroundCompany
  );
  yield takeLatest(
    companyUpdateLogoCompany.type,
    handleCompanyUpdateLogoCompany
  );
}
