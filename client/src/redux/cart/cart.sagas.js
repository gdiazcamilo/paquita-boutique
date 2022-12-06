import { takeLatest, call, all, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart, loadCart } from "../cart/cart.actions";
import CartTypes from "./cart.types";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { updateCartInDb, fetchCartFromDb } from "../../firebase/firebase.utils";

export function* clearCartSagas() {
  yield put(clearCart());
}

export function* updateCart() {
  try {
    const cartItems = yield select(selectCartItems);
    const user = yield select(selectCurrentUser);

    yield call(updateCartInDb, user.id, cartItems);
  } catch (error) {
    console.error("An error ocurred: ", error);
  }
}

export function* fetchCartItems() {
  const user = yield select(selectCurrentUser);
  if (!user) {
    return;
  }

  const cartItems = yield call(fetchCartFromDb, user.id);

  if (cartItems) {
    yield put(loadCart(cartItems));
  }
}

export function* watchUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCartItems);
}

export function* watchUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, clearCartSagas);
}

export function* watchAddItem() {
  yield takeLatest(CartTypes.ADD_ITEM, updateCart);
}

export function* watchRemoveItem() {
  yield takeLatest(CartTypes.REMOVE_ITEM, updateCart);
}

export function* watchChangeQuantity() {
  yield takeLatest(CartTypes.DECREASE_ITEM_QUANTITY, updateCart);
}

export function* cartSagas() {
  yield all([
    call(watchUserSignOut),
    call(watchAddItem),
    call(watchRemoveItem),
    call(watchChangeQuantity),
    call(watchUserSignIn),
  ]);
}
