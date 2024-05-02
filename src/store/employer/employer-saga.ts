import { takeLatest } from "redux-saga/effects";
import {
  employerConfirmCompanyEmployer,
  employerUpdateInformationEmployer,
} from "./employer-slice";
import {
  handleEmployerConfirmInformationCompany,
  handleEmployerUpdateInformation,
} from "./employer-handlers";

export default function* adminSaga() {
  yield takeLatest(
    employerUpdateInformationEmployer.type,
    handleEmployerUpdateInformation
  );
  yield takeLatest(
    employerConfirmCompanyEmployer.type,
    handleEmployerConfirmInformationCompany
  );
}
