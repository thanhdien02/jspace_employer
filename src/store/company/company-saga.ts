import { takeLatest } from "redux-saga/effects";
import {
  companyCreateCompany,
  companyGetCompany,
  companyGetCompanyById,
} from "./company-slice";
import {
  handleCompanyCreateCompany,
  handleCompanyGetCompany,
  handleCompanyGetCompanyById,
} from "./company-handlers";

export default function* adminSaga() {
  yield takeLatest(companyCreateCompany.type, handleCompanyCreateCompany);
  yield takeLatest(companyGetCompany.type, handleCompanyGetCompany);
  yield takeLatest(companyGetCompanyById.type, handleCompanyGetCompanyById);
}
