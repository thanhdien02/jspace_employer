import { takeLatest } from "redux-saga/effects";

import { jobPostJob } from "./job-slice";
import { handleJobPostJob } from "./job-handlers";

export default function* authSaga() {
  yield takeLatest(jobPostJob.type, handleJobPostJob);
}
