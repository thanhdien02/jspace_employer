import { createSlice } from "@reduxjs/toolkit";

interface ICandidate {
  appliedCandidate: any;
  loadingCandidate?: boolean;
  messageCandidate?: string;
  paginationCandidate?: any;
}

const init: ICandidate = {
  appliedCandidate: {},
  loadingCandidate: false,
  messageCandidate: "",
  paginationCandidate: {},
};
const candidateSlice: any = createSlice({
  name: "candidate",
  initialState: init,
  reducers: {
    candidateGetAppliedCandidate: () => {},
    candidateUpdateStatusAppliedCandidate: () => {},
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
  },
});
export const {
  candidateGetAppliedCandidate,
  candidateUpdateLoadingRedux,
  candidateUpdateMessageRedux,
  candidatePaginationRedux,
  candidateUpdateAppliedCandidateRedux,
  candidateUpdateStatusAppliedCandidate,
} = candidateSlice.actions;
export default candidateSlice.reducer;
