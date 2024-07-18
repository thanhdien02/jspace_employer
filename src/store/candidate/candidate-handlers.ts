import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";

import {
  candidateFindCandidatePaginationRedux,
  candidateFollowedCompanyPaginationRedux,
  candidatePaginationRedux,
  candidateUpdateAppliedCandidateRedux,
  candidateUpdateCandidateFollowedCompanyRedux,
  candidateUpdateFindCandidateRedux,
  candidateUpdateInformationCandidateRedux,
  candidateUpdateLoadingRedux,
} from "./candidate-slice";
import { message } from "antd";
import {
  requestCandidateGetAppliedCandidate,
  requestCandidateGetCandidateFollowedCompany,
  requestCandidateGetFindCandidate,
  requestCandidateGetInformation,
  requestCandidateSendMailToCompanyConfirmAgain,
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
function* handleCandidateGetFindCandidate(
  dataGetFindCandidate: any
): Generator<any> {
  try {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: true }));
    const { accessToken } = getToken();
    const response: any = yield call(
      requestCandidateGetFindCandidate,
      dataGetFindCandidate?.payload?.gender,
      dataGetFindCandidate?.payload?.location,
      dataGetFindCandidate?.payload?.rank,
      dataGetFindCandidate?.payload?.experience,
      dataGetFindCandidate?.payload?.page,
      dataGetFindCandidate?.payload?.size,
      accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        candidateUpdateFindCandidateRedux({
          findCandidate: response.data.result.content,
        })
      );
      yield put(
        candidateFindCandidatePaginationRedux({
          paginationFindCandidate: {
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
function* handleCandidateSendMailToCompanyConfirmAgain(
  dataCandidateSendMailRequestConfirmCompanyAgain: any
): Generator<any> {
  try {
    const token: Token = getToken();
    const response: any = yield call(
      requestCandidateSendMailToCompanyConfirmAgain,
      dataCandidateSendMailRequestConfirmCompanyAgain?.payload?.companyId,
      dataCandidateSendMailRequestConfirmCompanyAgain?.payload?.employerId,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      message?.success("Yêu cầu đã được gửi thành công.");
    }
  } catch (error) {
    message?.info("Gửi yêu cầu thất bại");
  }
}
function* handleCandidateGetInformation(
  dataCandidateInformation: any
): Generator<any> {
  try {
    yield put(candidateUpdateLoadingRedux({ loadingCandidate: true }));
    const token: Token = getToken();
    const response: any = yield call(
      requestCandidateGetInformation,
      dataCandidateInformation?.payload?.candidate_id,
      token?.accessToken
    );
    if (response?.data?.code === 1000) {
      yield put(
        candidateUpdateInformationCandidateRedux({
          informationCandidate: response.data.result,
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
  handleCandidateGetFindCandidate,
  handleCandidateSendMailToCompanyConfirmAgain,
  handleCandidateGetInformation,
};
