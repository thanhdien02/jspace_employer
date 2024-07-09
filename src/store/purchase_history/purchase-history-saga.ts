import { takeLatest } from "redux-saga/effects";
import { purchasehistoryGetExportAllPurchaseHistory, purchasehistoryGetPurchaseHistory } from "./purchase-history-slice";
import { handlePurchaseHistoryGetExportAllPurchaseHistory, handlePurchaseHistoryGetPurchaseHistory } from "./purchase-history-handlers";

export default function* authSaga() {
    yield takeLatest(purchasehistoryGetPurchaseHistory.type, handlePurchaseHistoryGetPurchaseHistory);
    yield takeLatest(purchasehistoryGetExportAllPurchaseHistory.type, handlePurchaseHistoryGetExportAllPurchaseHistory);
}
