import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import {
  jobUpdateJobByIdRedux,
  jobUpdateJobRedux,
  jobUpdateLoadingRedux,
  jobUpdateMessageRedux,
  jobUpdatePaginationPostedJobRedux,
} from "./job-slice";
import { message } from "antd";
import {
  requestJobGetJobById,
  requestJobGetPostedJob,
  requestJobPostJob,
} from "./job-requests";

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

      yield put(
        jobUpdateMessageRedux({
          messageJob: "postsuccess",
        })
      );

      message.success("Đăng tin thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingRedux({ loadingJob: false }));
  }
}
function* handleJobGetPostedJob(dataGetPostedJob: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingRedux({ loadingJob: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestJobGetPostedJob,
      dataGetPostedJob?.payload?.company_id,
      dataGetPostedJob?.payload?.page,
      dataGetPostedJob?.payload?.size,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        jobUpdateJobRedux({
          postedJobs: response.data.result.content,
        })
      );

      yield put(
        jobUpdatePaginationPostedJobRedux({
          paginationPostedJob: {
            pageNumber: response.data.result.pageNumber,
            pageSize: response.data.result.pageSize,
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            numberOfElements: response.data.result.numberOfElements,
          },
        })
      );

      message.success("Tải công việc thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingRedux({ loadingJob: false }));
  }
}
function* handleJobGetJobById(dataGetJobById: any): Generator<any> {
  console.log(
    "🚀 ~ function*handleJobGetJobById ~ dataGetJobById:",
    dataGetJobById
  );
  try {
    yield put(jobUpdateLoadingRedux({ loadingJob: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestJobGetJobById,
      dataGetJobById?.payload?.job_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        jobUpdateJobByIdRedux({
          jobById: response.data.result,
        })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingRedux({ loadingJob: false }));
  }
}
export { handleJobPostJob, handleJobGetPostedJob, handleJobGetJobById };
