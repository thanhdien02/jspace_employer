import { createSlice } from "@reduxjs/toolkit";

interface ICandidate {
  candidateFollowedCompany: any;
  appliedCandidate: any;
  loadingCandidate?: boolean;
  messageCandidate?: string;
  paginationCandidate?: any;
  paginationCandidateFollowedCompany?: any;
}

const init: ICandidate = {
  candidateFollowedCompany: {},
  appliedCandidate: {},
  loadingCandidate: false,
  messageCandidate: "",
  paginationCandidate: {},
  paginationCandidateFollowedCompany: {},
};
const candidateSlice: any = createSlice({
  name: "candidate",
  initialState: init,
  reducers: {
    candidateGetAppliedCandidate: () => {},
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
} = candidateSlice.actions;
export default candidateSlice.reducer;
