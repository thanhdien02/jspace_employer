import { takeLatest } from "redux-saga/effects";
import { fileGetAllFile, fileUploadFile } from "./file-slice";
import { handleFileGetAllFile, handleFileUploadFile } from "./file-handlers";

export default function* authSaga() {
  yield takeLatest(fileUploadFile.type, handleFileUploadFile);
  yield takeLatest(fileGetAllFile.type, handleFileGetAllFile);
}
