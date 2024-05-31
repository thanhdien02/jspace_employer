import { takeLatest } from "redux-saga/effects";
import {
  cartAddToCart,
  cartDeleteCart,
  cartGetCart,
  cartUpdateCart,
} from "./cart-slice";
import {
  handleCartAddToCart,
  handleCartDeleteCart,
  handleCartGetCart,
  handleCartUpdateCart,
} from "./cart-handlers";

export default function* authSaga() {
  yield takeLatest(cartAddToCart.type, handleCartAddToCart);
  yield takeLatest(cartGetCart.type, handleCartGetCart);
  yield takeLatest(cartUpdateCart.type, handleCartUpdateCart);
  yield takeLatest(cartDeleteCart.type, handleCartDeleteCart);
}
