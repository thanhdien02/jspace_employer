import { takeLatest } from "redux-saga/effects";
import { purchasehistoryGetPurchaseHistory } from "./purchase-history-slice";
import { handlePurchaseHistoryGetPurchaseHistory } from "./purchase-history-handlers";

export default function* authSaga() {
    yield takeLatest(purchasehistoryGetPurchaseHistory.type, handlePurchaseHistoryGetPurchaseHistory);
}
