import { call, put } from "redux-saga/effects";
import { getToken } from "../../utils/auth";

import {
  candidateFollowedCompanyPaginationRedux,
  candidatePaginationRedux,
  candidateUpdateAppliedCandidateRedux,
  candidateUpdateCandidateFollowedCompanyRedux,
  candidateUpdateLoadingRedux,
} from "./candidate-slice";
import { message } from "antd";
import {
  requestCandidateGetAppliedCandidate,
  requestCandidateGetCandidateFollowedCompany,
  requestEmployerUpdateStatusAppliedCandidate,
} from "./candidate-requests";

function* handleCandidateGetAppliedCandidate(
  dataGetAppliedCandidate: any
): Generator<any> {
  try {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: true }));
    const { accessToken } = getToken();
    const response: any = yield call(
      requestCandidateGetAppliedCandidate,
      dataGetAppliedCandidate?.payload?.job_id,
      dataGetAppliedCandidate?.payload?.candidateName,
      dataGetAppliedCandidate?.payload?.candidateEmail,
      dataGetAppliedCandidate?.payload?.applyStatus,
      dataGetAppliedCandidate?.payload?.page,
      dataGetAppliedCandidate?.payload?.size,
      accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        candidateUpdateAppliedCandidateRedux({
          appliedCandidate: response.data.result.content,
        })
      );
      yield put(
        candidatePaginationRedux({
          paginationCandidate: {
            pageNumber: response.data.result.pageNumber,
            pageSize: response.data.result.pageSize,
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            numberOfElements: response.data.result.numberOfElements,
          },
        })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: false }));
  }
}
function* handleEmployerUpdateStatusAppliedCandidate(
  dataEmployerUpdateAppliedCandidate: any
): Generator<any> {
  try {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: true }));
    const { accessToken } = getToken();
    const response: any = yield call(
      requestEmployerUpdateStatusAppliedCandidate,
      dataEmployerUpdateAppliedCandidate?.payload?.postId,
      dataEmployerUpdateAppliedCandidate?.payload?.candidateId,
      dataEmployerUpdateAppliedCandidate?.payload?.applyStatus,
      dataEmployerUpdateAppliedCandidate?.payload?.notification,
      accessToken
    );
    yield call(handleCandidateGetAppliedCandidate, {
      payload: { job_id: dataEmployerUpdateAppliedCandidate?.payload?.postId },
    });
    if (response?.data?.code === 1000) {
      message.success("Cập nhật thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: false }));
  }
}
function* handleCandidateGetCandidateFollowedCompany(
  dataGetCandidateFollowedCompany: any
): Generator<any> {
  try {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: true }));
    const { accessToken } = getToken();
    const response: any = yield call(
      requestCandidateGetCandidateFollowedCompany,
      dataGetCandidateFollowedCompany?.payload?.companyId,
      dataGetCandidateFollowedCompany?.payload?.name,
      dataGetCandidateFollowedCompany?.payload?.email,
      dataGetCandidateFollowedCompany?.payload?.phone,
      dataGetCandidateFollowedCompany?.payload?.page,
      dataGetCandidateFollowedCompany?.payload?.size,
      accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        candidateUpdateCandidateFollowedCompanyRedux({
          candidateFollowedCompany: response.data.result.content,
        })
      );
      yield put(
        candidateFollowedCompanyPaginationRedux({
          paginationCandidateFollowedCompany: {
            pageNumber: response.data.result.pageNumber,
            pageSize: response.data.result.pageSize,
            totalElements: response.data.result.totalElements,
            totalPages: response.data.result.totalPages,
            numberOfElements: response.data.result.numberOfElements,
          },
        })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: false }));
  }
}
export {
  handleCandidateGetAppliedCandidate,
  handleEmployerUpdateStatusAppliedCandidate,
  handleCandidateGetCandidateFollowedCompany,
};
