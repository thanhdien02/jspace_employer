import { call, put } from "redux-saga/effects";
import { requestGetAllUser } from "./user-requests";
import { userUpdateData } from "./user-slice";

function* handleGetAllUsers(accessToken: any): Generator<any> {
  try {
    const response: any = yield call(requestGetAllUser, accessToken?.payload);

    yield put(userUpdateData(response.data.result.content));
  } catch (error) {}
}

export { handleGetAllUsers };
