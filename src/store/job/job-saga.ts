import { takeLatest } from "redux-saga/effects";

import {
  jobGetJobById,
  jobGetPostedJob,
  jobPostJob,
  jobUpdateJob,
  jobUpdateJobStatus,
} from "./job-slice";
import {
  handleJobGetJobById,
  handleJobGetPostedJob,
  handleJobPostJob,
  handleJobUpdateJob,
  handleJobUpdateJobStatus,
} from "./job-handlers";

export default function* authSaga() {
  yield takeLatest(jobPostJob.type, handleJobPostJob);
  yield takeLatest(jobGetPostedJob.type, handleJobGetPostedJob);
  yield takeLatest(jobGetJobById.type, handleJobGetJobById);
  yield takeLatest(jobUpdateJob.type, handleJobUpdateJob);
  yield takeLatest(jobUpdateJobStatus.type, handleJobUpdateJobStatus);
}
