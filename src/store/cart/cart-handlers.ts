import { call, put } from "redux-saga/effects";
import { getToken, Token } from "../../utils/auth";
import { message } from "antd";
import {
  cartUpdateCartRedux,
  cartUpdateLoadingRedux,
  cartUpdateMessageRedux,
  cartUpdatePaginationRedux,
} from "./cart-slice";
import {
  requestCartAddToCart,
  requestCartDeleteCart,
  requestCartGetCart,
  requestCartUpdateCart,
} from "./cart-requests";

function* handleCartAddToCart(dataAddToCart: any): Generator<any> {
  try {
    yield put(cartUpdateLoadingRedux({ loadingCart: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCartAddToCart,
      dataAddToCart?.payload,
      token?.accessToken
    );

    if (response?.data?.code == 1000) {
      message.success("Thêm sản phẩm vào giỏ hàng thành công.");
      yield put(cartUpdateMessageRedux({ messageCart: "addtocart" }));
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(cartUpdateLoadingRedux({ loadingCart: false }));
  }
}
function* handleCartUpdateCart(dataUpdateCart: any): Generator<any> {
  try {
    yield put(cartUpdateLoadingRedux({ loadingCart: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCartUpdateCart,
      dataUpdateCart?.payload?.cart_id,
      dataUpdateCart?.payload?.quantity,
      token?.accessToken
    );
    if (response?.data?.code == 1000) {
      yield call(handleCartGetCart, {
        payload: {
          page: 1,
          size: 10,
          company_id: dataUpdateCart?.payload?.company_id,
        },
      });
      message.success("Cập nhật sản phẩm vào giỏ hàng thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(cartUpdateLoadingRedux({ loadingCart: false }));
  }
}
function* handleCartDeleteCart(dataDeleteCart: any): Generator<any> {
  try {
    yield put(cartUpdateLoadingRedux({ loadingCart: true }));
    const token: Token = getToken();

    const response: any = yield call(
      requestCartDeleteCart,
      dataDeleteCart?.payload?.cart_id,
      token?.accessToken
    );
    if (response?.data?.code == 1000) {
      yield call(handleCartGetCart, {
        payload: {
          company_id: dataDeleteCart?.payload?.company_id,
          page: 1,
          size: 10,
        },
      });
      message.success("Xóa sản phẩm ra khỏi giỏ hàng thành công.");
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(cartUpdateLoadingRedux({ loadingCart: false }));
  }
}

function* handleCartGetCart(dataGetCart: any): Generator<any> {
  try {
    yield put(
      cartUpdateLoadingRedux({
        loadingCart: true,
      })
    );
    const token: Token = getToken();
    const response: any = yield call(
      requestCartGetCart,
      dataGetCart?.payload?.company_id,
      dataGetCart?.payload?.page,
      dataGetCart?.payload?.size,
      token?.accessToken
    );
    if (response.data.code === 1000) {
      yield put(
        cartUpdateCartRedux({
          carts: response.data.result.content,
        })
      );
      yield put(
        cartUpdatePaginationRedux({
          paginationCart: {
            pageNumber: response.data?.result?.pageNumber,
            pageSize: response.data?.result?.pageSize,
            totalElements: response.data?.result?.totalElements,
            totalPages: response.data?.result?.totalPages,
            numberOfElements: response.data?.result?.numberOfElements,
          },
        })
      );
    }
  } catch (error: any) {
    message.error(error?.response?.data?.message);
  } finally {
    yield put(
      cartUpdateLoadingRedux({
        loadingCart: false,
      })
    );
  }
}
export {
  handleCartAddToCart,
  handleCartGetCart,
  handleCartUpdateCart,
  handleCartDeleteCart,
};
