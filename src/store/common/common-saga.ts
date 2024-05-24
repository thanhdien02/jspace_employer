import { takeLatest } from "redux-saga/effects";
import {
  commonGetApplyStatus,
  commonGetExperience,
  commonGetGender,
  commonGetJobType,
  commonGetLocation,
  commonGetRank,
  commonGetSkills,
} from "./common-slice";
import {
  handleCommonGetApplyStatus,
  handleCommonGetExperience,
  handleCommonGetGender,
  handleCommonGetJobType,
  handleCommonGetLocation,
  handleCommonGetRank,
  handleCommonGetSkills,
} from "./common-handlers";
export default function* adminSaga() {
  yield takeLatest(commonGetLocation.type, handleCommonGetLocation);
  yield takeLatest(commonGetJobType.type, handleCommonGetJobType);
  yield takeLatest(commonGetRank.type, handleCommonGetRank);
  yield takeLatest(commonGetGender.type, handleCommonGetGender);
  yield takeLatest(commonGetExperience.type, handleCommonGetExperience);
  yield takeLatest(commonGetApplyStatus.type, handleCommonGetApplyStatus);
  yield takeLatest(commonGetSkills.type, handleCommonGetSkills);
}
