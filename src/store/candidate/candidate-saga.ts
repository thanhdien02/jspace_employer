import { takeLatest } from "redux-saga/effects";
import {
  candidateGetAppliedCandidate,
  candidateGetCandidateFollowedCompany,
  candidateGetFindCandidate,
  candidateSendMailToCompanyConfirmAgain,
  candidateUpdateStatusAppliedCandidate,
} from "./candidate-slice";
import {
  handleCandidateGetAppliedCandidate,
  handleCandidateGetCandidateFollowedCompany,
  handleCandidateGetFindCandidate,
  handleCandidateSendMailToCompanyConfirmAgain,
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
  yield takeLatest(
    candidateGetFindCandidate.type,
    handleCandidateGetFindCandidate
  );
  yield takeLatest(
    candidateSendMailToCompanyConfirmAgain.type,
    handleCandidateSendMailToCompanyConfirmAgain
  );
}
