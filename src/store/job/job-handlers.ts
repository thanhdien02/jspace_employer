import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import {
  jobUpdateJobByIdRedux,
  jobUpdateJobRedux,
  jobUpdateLoadingByIdRedux,
  jobUpdateLoadingRedux,
  jobUpdateMessageRedux,
  jobUpdatePaginationPostedJobRedux,
} from "./job-slice";
import { message } from "antd";
import {
  requestJobDeleteJobById,
  requestJobGetJobById,
  requestJobGetPostedJob,
  requestJobPostJob,
  requestJobUpdateJob,
  requestJobUpdateJobStatus,
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
      dataGetPostedJob?.payload?.title,
      dataGetPostedJob?.payload?.postStatus,
      dataGetPostedJob?.payload?.duration,
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
      // message.success("Tải công việc thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingRedux({ loadingJob: false }));
  }
}
function* handleJobGetJobById(dataGetJobById: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: true }));
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
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: false }));
  }
}
function* handleJobUpdateJob(dataUpdateJob: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestJobUpdateJob,
      dataUpdateJob?.payload?.job_id,
      dataUpdateJob?.payload?.dataUpdateJob,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield call(handleJobGetPostedJob, {
        payload: {
          company_id: dataUpdateJob?.payload?.company_id,
          page: 1,
          size: 10,
        },
      });

      message.success("Cập nhập thông tin công việc thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: false }));
  }
}
function* handleJobUpdateJobStatus(dataUpdateJobStatus: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestJobUpdateJobStatus,
      dataUpdateJobStatus?.payload?.job_id,
      dataUpdateJobStatus?.payload?.job_status,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield call(handleJobGetPostedJob, {
        payload: {
          company_id: dataUpdateJobStatus?.payload?.company_id,
          page: 1,
          size: 10,
        },
      });
      yield call(handleJobGetJobById, {
        payload: {
          job_id: dataUpdateJobStatus?.payload?.job_id,
        },
      });
      message.success("Cập nhập trạng thái công việc thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: false }));
  }
}
function* handleJobDeleteJobById(dataDeleteJob: any): Generator<any> {
  try {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: true }));
    const token: Token = getToken();
    const response: any = yield call(
      requestJobDeleteJobById,
      dataDeleteJob?.payload?.job_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield call(handleJobGetPostedJob, {
        payload: {
          company_id: dataDeleteJob?.payload?.company_id,
          page: 1,
          size: 10,
        },
      });
      message.success("Cập nhập trạng thái công việc thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(jobUpdateLoadingByIdRedux({ loadingJobById: false }));
  }
}
export {
  handleJobPostJob,
  handleJobGetPostedJob,
  handleJobGetJobById,
  handleJobUpdateJob,
  handleJobUpdateJobStatus,
  handleJobDeleteJobById,
};
