import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  postedJobs: any;
  jobById: any;
  loadingJob?: boolean;
  loadingJobById?: boolean;
  messageJob?: string;
  paginationPostedJob?: any;
}

const init: IFile = {
  postedJobs: {},
  jobById: {},
  loadingJob: false,
  loadingJobById: false,
  messageJob: "",
  paginationPostedJob: {},
};
const jobSlice: any = createSlice({
  name: "job",
  initialState: init,
  reducers: {
    jobDeleteJobById: () => {},
    jobGetJobById: () => {},
    jobUpdateJob: () => {},
    jobUpdateJobStatus: () => {},
    jobGetJobFilter: () => {},
    jobGetPostedJob: () => {},
    jobPostJob: () => {},
    jobUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingJob: action.payload.loadingJob,
    }),
    jobUpdateLoadingByIdRedux: (state: any, action: any) => ({
      ...state,
      loadingJobById: action.payload.loadingJobById,
    }),
    jobUpdateJobByIdRedux: (state: any, action: any) => ({
      ...state,
      jobById: action.payload.jobById,
    }),
    jobUpdateJobRedux: (state: any, action: any) => ({
      ...state,
      postedJobs: action.payload.postedJobs,
    }),
    jobUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageJob: action.payload.messageJob,
    }),
    jobUpdatePaginationPostedJobRedux: (state: any, action: any) => ({
      ...state,
      paginationPostedJob: action.payload.paginationPostedJob,
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
  jobPostJob,
  jobUpdatePaginationPostedJobRedux,
  jobGetPostedJob,
  jobUpdateJobByIdRedux,
  jobUpdateLoadingByIdRedux,
  jobUpdateJobStatus,
  jobDeleteJobById,
} = jobSlice.actions;
export default jobSlice.reducer;
