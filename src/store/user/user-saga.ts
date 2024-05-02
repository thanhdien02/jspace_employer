import { takeLatest } from "redux-saga/effects";
import { userGetAll } from "./user-slice";
import { handleGetAllUsers } from "./user-handlers";

export default function* authSaga() {
  yield takeLatest(userGetAll.type, handleGetAllUsers);
}
