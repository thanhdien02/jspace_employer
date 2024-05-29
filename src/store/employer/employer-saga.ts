import { takeLatest } from "redux-saga/effects";
import {
  employerConfirmCompanyEmployer,
  employerUpdateAvatarEmployer,
  employerUpdateBackgroundEmployer,
  employerUpdateInformationEmployer,
} from "./employer-slice";
import {
  handleEmployerConfirmInformationCompany,
  handleEmployerUpdateAvatarEmployer,
  handleEmployerUpdateBackgroundEmployer,
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
    handleEmployerUpdateBackgroundEmployer
  );
  yield takeLatest(
    employerUpdateAvatarEmployer.type,
    handleEmployerUpdateAvatarEmployer
  );
}
