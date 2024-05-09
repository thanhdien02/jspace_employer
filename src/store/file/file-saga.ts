import { takeLatest } from "redux-saga/effects";
import { fileGetAllFile, fileUploadFile, fileUploadImage } from "./file-slice";
import {
  handleFileGetAllFile,
  handleFileUploadFile,
  handleFileUploadImage,
} from "./file-handlers";

export default function* authSaga() {
  yield takeLatest(fileUploadFile.type, handleFileUploadFile);
  yield takeLatest(fileUploadImage.type, handleFileUploadImage);
  yield takeLatest(fileGetAllFile.type, handleFileGetAllFile);
}
