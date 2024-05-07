import { takeLatest } from "redux-saga/effects";
import {
  employerConfirmCompanyEmployer,
  employerUpdateBackgroundEmployer,
  employerUpdateInformationEmployer,
} from "./employer-slice";
import {
  handleEmployerBackgroundEmployer,
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
  yield takeLatest(
    employerUpdateBackgroundEmployer.type,
    handleEmployerBackgroundEmployer
  );
}
