import { createSlice } from "@reduxjs/toolkit";

interface ICandidate {
  findCandidate: any;
  candidateFollowedCompany: any;
  appliedCandidate: any;
  loadingCandidate?: boolean;
  messageCandidate?: string;
  paginationCandidate?: any;
  paginationCandidateFollowedCompany?: any;
  paginationFindCandidate?: any;
}

const init: ICandidate = {
  findCandidate: {},
  candidateFollowedCompany: {},
  appliedCandidate: {},
  loadingCandidate: false,
  messageCandidate: "",
  paginationCandidate: {},
  paginationCandidateFollowedCompany: {},
  paginationFindCandidate: {},
};
const candidateSlice: any = createSlice({
  name: "candidate",
  initialState: init,
  reducers: {
    candidateSendMailToCompanyConfirmAgain: () => {},
    candidateGetAppliedCandidate: () => {},
    candidateGetFindCandidate: () => {},
    candidateGetCandidateFollowedCompany: () => {},
    candidateUpdateStatusAppliedCandidate: () => {},
    candidateUpdateCandidateFollowedCompanyRedux: (
      state: any,
      action: any
    ) => ({
      ...state,
      candidateFollowedCompany: action.payload.candidateFollowedCompany,
    }),
    candidateUpdateAppliedCandidateRedux: (state: any, action: any) => ({
      ...state,
      appliedCandidate: action.payload.appliedCandidate,
    }),
    candidateUpdateFindCandidateRedux: (state: any, action: any) => ({
      ...state,
      findCandidate: action.payload.findCandidate,
    }),
    candidateUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingCandidate: action.payload.loadingCandidate,
    }),
    candidateUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageCandidate: action.payload.messageCandidate,
    }),
    candidatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationCandidate: action.payload.paginationCandidate,
    }),
    candidateFollowedCompanyPaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationCandidateFollowedCompany:
        action.payload.paginationCandidateFollowedCompany,
    }),
    candidateFindCandidatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationFindCandidate: action.payload.paginationFindCandidate,
    }),
  },
});
export const {
  candidateGetAppliedCandidate,
  candidateUpdateLoadingRedux,
  candidateUpdateMessageRedux,
  candidatePaginationRedux,
  candidateUpdateAppliedCandidateRedux,
  candidateUpdateStatusAppliedCandidate,
  candidateGetCandidateFollowedCompany,
  candidateUpdateCandidateFollowedCompanyRedux,
  candidateFollowedCompanyPaginationRedux,
  candidateGetFindCandidate,
  candidateUpdateFindCandidateRedux,
  candidateFindCandidatePaginationRedux,
  candidateSendMailToCompanyConfirmAgain,
} = candidateSlice.actions;
export default candidateSlice.reducer;
