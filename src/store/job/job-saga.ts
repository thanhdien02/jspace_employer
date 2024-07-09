import { takeLatest } from "redux-saga/effects";

import {
  jobDeleteJobById,
  jobGetJobById,
  jobGetPostedJob,
  jobPostJob,
  jobUpdateJob,
  jobUpdateJobStatus,
} from "./job-slice";
import {
  handleJobDeleteJobById,
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
  yield takeLatest(jobDeleteJobById.type, handleJobDeleteJobById);
}
