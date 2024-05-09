import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  jobs: any;
  loadingJob?: boolean;
  messageJob?: string;
}

const init: IFile = {
  jobs: {},
  loadingJob: false,
  messageJob: "",
};
const jobSlice: any = createSlice({
  name: "job",
  initialState: init,
  reducers: {
    jobGetJobById: () => {},
    jobUpdateJob: () => {},
    jobUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingJob: action.payload.loadingJob,
    }),
    jobUpdateJobRedux: (state: any, action: any) => ({
      ...state,
      jobs: action.payload.jobs,
    }),
    jobUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageJob: action.payload.messageJob,
    }),
    jobGetJobFilter: (state: any) => ({
      ...state,
    }),
  },
});
export const {
  jobGetJobById,
  jobUpdateLoadingRedux,
  jobUpdateMessageRedux,
  jobGetJobFilter,
  jobUpdateJobRedux,
  jobUpdateJob,
} = jobSlice.actions;
export default jobSlice.reducer;
