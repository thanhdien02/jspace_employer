import { takeLatest } from "redux-saga/effects";
import {
  productCreateProduct,
  productGetBuyedProduct,
  productGetProduct,
  productGetProductById,
} from "./product-slice";
import {
  handleProductCreateProduct,
  handleProductGetBuyedProduct,
  handleProductGetProduct,
  handleProductGetProductById,
} from "./product-handlers";

export default function* authSaga() {
  yield takeLatest(productGetProduct.type, handleProductGetProduct);
  yield takeLatest(productGetBuyedProduct.type, handleProductGetBuyedProduct);
  yield takeLatest(productGetProductById.type, handleProductGetProductById);
  yield takeLatest(productCreateProduct.type, handleProductCreateProduct);
}
