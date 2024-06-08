import { takeLatest } from "redux-saga/effects";
import { candidateGetAppliedCandidate } from "./candidate-slice";
import { handleCandidateGetAppliedCandidate } from "./candidate-handlers";

export default function* authSaga() {
  yield takeLatest(
    candidateGetAppliedCandidate.type,
    handleCandidateGetAppliedCandidate
  );
}
