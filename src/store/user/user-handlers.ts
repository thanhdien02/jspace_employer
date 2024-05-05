import { call, put } from "redux-saga/effects";
import { requestGetAllUser } from "./user-requests";
import { userUpdateData } from "./user-slice";
import { message } from "antd";

function* handleGetAllUsers(accessToken: any): Generator<any> {
  try {
    const response: any = yield call(requestGetAllUser, accessToken?.payload);

    yield put(userUpdateData(response.data.result.content));
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  }
}

export { handleGetAllUsers };
