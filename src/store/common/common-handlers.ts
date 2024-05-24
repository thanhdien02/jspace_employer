import { call, put } from "redux-saga/effects";
import { message } from "antd";
import {
  commonUpdateApplyStatusRedux,
  commonUpdateExperienceRedux,
  commonUpdateGenderRedux,
  commonUpdateJobTypeRedux,
  commonUpdateLocationRedux,
  commonUpdateRankRedux,
  commonUpdateSkillsRedux,
} from "./common-slice";
import {
  requestCommonGetApplyRank,
  requestCommonGetApplyStatus,
  requestCommonGetExperience,
  requestCommonGetGender,
  requestCommonGetJobType,
  requestCommonGetLocation,
  requestCommonGetSkills,
} from "./common-requests";

function* handleCommonGetLocation(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetLocation);
    if (response?.data?.code === 1000) {
      yield put(commonUpdateLocationRedux({ locations: response.data.result }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetJobType(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetJobType);
    if (response?.data?.code === 1000) {
      yield put(commonUpdateJobTypeRedux({ jobTypes: response.data.result }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetGender(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetGender);
    if (response?.data?.code === 1000) {
      yield put(commonUpdateGenderRedux({ genders: response.data.result }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetApplyStatus(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetApplyStatus);
    if (response?.data?.code === 1000) {
      yield put(
        commonUpdateApplyStatusRedux({ applyStatus: response.data.result })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetRank(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetApplyRank);
    if (response?.data?.code === 1000) {
      yield put(commonUpdateRankRedux({ ranks: response.data.result }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetExperience(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetExperience);
    if (response?.data?.code === 1000) {
      yield put(
        commonUpdateExperienceRedux({ experiences: response.data.result })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
function* handleCommonGetSkills(): Generator<any> {
  try {
    const response: any = yield call(requestCommonGetSkills);
    if (response?.data?.code === 1000) {
      yield put(commonUpdateSkillsRedux({ skills: response.data.result }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
  }
}
export {
  handleCommonGetLocation,
  handleCommonGetJobType,
  handleCommonGetGender,
  handleCommonGetApplyStatus,
  handleCommonGetRank,
  handleCommonGetExperience,
  handleCommonGetSkills,
};
