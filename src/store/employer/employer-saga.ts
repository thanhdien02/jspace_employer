import { takeLatest } from "redux-saga/effects";
import {
  employerConfirmCompanyEmployer,
  employerDeleteAvatarEmployer,
  employerDeleteBackgroundEmployer,
  employerUpdateAvatarEmployer,
  employerUpdateBackgroundEmployer,
  employerUpdateInformationEmployer,
} from "./employer-slice";
import {
  handleEmployerConfirmInformationCompany,
  handleEmployerDeleteAvatarEmployer,
  handleEmployerDeleteBackgroundEmployer,
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
  yield takeLatest(
    employerDeleteAvatarEmployer.type,
    handleEmployerDeleteAvatarEmployer
  );
  yield takeLatest(
    employerDeleteBackgroundEmployer.type,
    handleEmployerDeleteBackgroundEmployer
  );
}
