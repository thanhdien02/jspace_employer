import { call, put } from "redux-saga/effects";
import { getToken } from "../../utils/auth";
import {
  fileUpdateFileRedux,
  fileUpdateLoadingRedux,
  fileUpdateMessageRedux,
} from "./file-slice";
import {
  requestFileGetAllFile,
  requestFileUploadFile,
  requestFileUploadImage,
} from "./file-requests";
import { message } from "antd";

function* handleFileUploadFile(dataUploadFile: any): Generator<any> {
  try {
    yield put(fileUpdateLoadingRedux({ loadingFile: true }));
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
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(fileUpdateLoadingRedux({ loadingFile: false }));
  }
}

function* handleFileUploadImage(dataUploadImage: any): Generator<any> {
  try {
    yield put(fileUpdateLoadingRedux({ loadingFile: true }));
    const formData = new FormData();
    formData.append("file", dataUploadImage?.payload?.file?.originFileObj);
    const { accessToken } = getToken();
    const response: any = yield call(
      requestFileUploadImage,
      formData,
      accessToken
    );
    console.log("🚀 ~ function*handleFileUploadImage ~ response:", response);
    if (response?.data?.code === 1000) {
      message.success("Upload ảnh thành công");
      yield put(fileUpdateFileRedux({ files: response?.data?.result }));
      if (dataUploadImage?.payload?.message == "logo") {
        yield put(fileUpdateMessageRedux({ messageFile: "logo" }));
      } else if (dataUploadImage?.payload?.message == "background") {
        yield put(fileUpdateMessageRedux({ messageFile: "background" }));
      }
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(fileUpdateLoadingRedux({ loadingFile: false }));
  }
}
function* handleFileGetAllFile(dataCandadate_id: any): Generator<any> {
  console.log(dataCandadate_id);
  try {
    yield put(fileUpdateLoadingRedux({ loadingFile: true }));
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
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(fileUpdateLoadingRedux({ loadingFile: false }));
  }
}
export { handleFileUploadFile, handleFileGetAllFile, handleFileUploadImage };
