import { takeLatest, call, all, put } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart } from "../cart/cart.actions";

function* clearCartSagas() {
  yield put(clearCart());
}

function* watchUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, clearCartSagas);
}

export function* cartSagas() {
  yield all([call(watchUserSignOut)]);
}
