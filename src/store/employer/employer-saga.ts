import { takeLatest } from "redux-saga/effects";
import { employerUpdateInformationEmployer } from "./employer-slice";
import { handleEmployerUpdateInformation } from "./employer-handlers";

export default function* adminSaga() {
  yield takeLatest(
    employerUpdateInformationEmployer.type,
    handleEmployerUpdateInformation
  );
}
