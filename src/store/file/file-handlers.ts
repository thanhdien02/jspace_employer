import { call, put } from "redux-saga/effects";
import { getToken } from "../../utils/auth";
import {
  fileUpdateFileRedux,
  fileUpdateLoadingRedux,
  fileUpdateMessageRedux,
} from "./file-slice";
import { requestFileGetAllFile, requestFileUploadFile } from "./file-requests";
import { message } from "antd";

function* handleFileUploadFile(dataUploadFile: any): Generator<any> {
  try {
    yield put(fileUpdateLoadingRedux({ loading: true }));
    const formData = new FormData();
    formData.append("file", dataUploadFile?.payload?.file);
    formData.append("name", dataUploadFile?.payload?.file?.name);
    const { accessToken } = getToken();
    const response: any = yield call(
      requestFileUploadFile,
      dataUploadFile?.payload?.candidate_id,
      accessToken,
      formData
    );
    if (response?.data?.code === 1000) {
      message.success("Upload successful");
      yield put(
        fileUpdateMessageRedux({
          messageFile: "success",
        })
      );
    }
  } catch (error) {
  } finally {
    yield put(fileUpdateLoadingRedux({ loading: false }));
  }
}
function* handleFileGetAllFile(dataCandadate_id: any): Generator<any> {
  console.log(dataCandadate_id);
  try {
    yield put(fileUpdateLoadingRedux({ loading: true }));
    const { accessToken } = getToken();
    const response: any = yield call(
      requestFileGetAllFile,
      dataCandadate_id?.payload?.candidate_id,
      accessToken
    );
    if (response?.data?.code === 1000) {
      message.success("Load dữ liệu thành công");
      yield put(
        fileUpdateMessageRedux({
          messageFile: "success",
        })
      );
      yield put(
        fileUpdateFileRedux({
          files: response?.data?.result,
        })
      );
    }
  } catch (error) {
  } finally {
    yield put(fileUpdateLoadingRedux({ loading: false }));
  }
}
export { handleFileUploadFile, handleFileGetAllFile };
