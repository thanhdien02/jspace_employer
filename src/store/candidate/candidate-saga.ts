import { takeLatest } from "redux-saga/effects";
import {
  candidateGetAppliedCandidate,
  candidateUpdateStatusAppliedCandidate,
} from "./candidate-slice";
import {
  handleCandidateGetAppliedCandidate,
  handleEmployerUpdateStatusAppliedCandidate,
} from "./candidate-handlers";

export default function* authSaga() {
  yield takeLatest(
    candidateGetAppliedCandidate.type,
    handleCandidateGetAppliedCandidate
  );
  yield takeLatest(
    candidateUpdateStatusAppliedCandidate.type,
    handleEmployerUpdateStatusAppliedCandidate
  );
}
