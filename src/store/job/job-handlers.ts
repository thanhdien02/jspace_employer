import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { jobUpdateLoadingRedux } from "./job-slice";
import { message } from "antd";
import { requestJobPostJob } from "./job-requests";

function* handleJobPostJob(dataPostJob: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingRedux({ loadingJob: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestJobPostJob,
      dataPostJob?.payload,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      console.log("🚀 ~ function*handleJobPostJob ~ response:", response);
      message.success("Đăng tin thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingRedux({ loadingJob: false }));
  }
}
export { handleJobPostJob };
