import { takeLatest } from "redux-saga/effects";
import {
  productCreateProduct,
  productGetBuyedProduct,
  productGetBuyedProductById,
  productGetProduct,
  productGetProductById,
} from "./product-slice";
import {
  handleProductCreateProduct,
  handleProductGetBuyedProduct,
  handleProductGetBuyedProductById,
  handleProductGetProduct,
  handleProductGetProductById,
} from "./product-handlers";

export default function* authSaga() {
  yield takeLatest(productGetProduct.type, handleProductGetProduct);
  yield takeLatest(productGetBuyedProduct.type, handleProductGetBuyedProduct);
  yield takeLatest(productGetProductById.type, handleProductGetProductById);
  yield takeLatest(productGetBuyedProductById.type, handleProductGetBuyedProductById);
  yield takeLatest(productCreateProduct.type, handleProductCreateProduct);
}
