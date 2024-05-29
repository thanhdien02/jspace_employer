import { takeLatest } from "redux-saga/effects";
import { productCreateProduct, productGetProduct } from "./product-slice";
import {
  handleProductCreateProduct,
  handleProductGetProduct,
} from "./product-handlers";

export default function* authSaga() {
  yield takeLatest(productGetProduct.type, handleProductGetProduct);
  yield takeLatest(productCreateProduct.type, handleProductCreateProduct);
}
