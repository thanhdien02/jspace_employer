import { takeLatest } from "redux-saga/effects";
import { userGetAll } from "./user-slice";
import { handleGetAllUsers } from "./user-handlers";
// import { handleAuthLogin } from "./auth-handlers";

export default function* authSaga() {
  yield takeLatest(userGetAll.type, handleGetAllUsers);
}
