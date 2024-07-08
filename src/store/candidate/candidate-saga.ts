import { takeLatest } from "redux-saga/effects";
import {
  candidateGetAppliedCandidate,
  candidateGetCandidateFollowedCompany,
  candidateUpdateStatusAppliedCandidate,
} from "./candidate-slice";
import {
  handleCandidateGetAppliedCandidate,
  handleCandidateGetCandidateFollowedCompany,
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
  yield takeLatest(
    candidateGetCandidateFollowedCompany.type,
    handleCandidateGetCandidateFollowedCompany
  );
}
