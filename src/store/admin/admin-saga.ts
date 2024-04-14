import { takeLatest } from "redux-saga/effects";
import { adminCreateSubAdmin } from "./admin-slice";
import { handleAdminCreateSubAdmin } from "./admin-handlers";


export default function* adminSaga() {
  yield takeLatest(adminCreateSubAdmin.type, handleAdminCreateSubAdmin);
}
