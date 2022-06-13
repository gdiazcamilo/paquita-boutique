import { takeLatest, call, all, put, select } from "redux-saga/effects";

import UserActionTypes from "../user/user.types";
import { clearCart, loadCart } from "../cart/cart.actions";
import CartTypes from "./cart.types";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import { updateCartInDb, fetchCartFromDb } from "../../firebase/firebase.utils";

function* clearCartSagas() {
  yield put(clearCart());
}

function* updateCart() {
  const cartItems = yield select(selectCartItems);
  const user = yield select(selectCurrentUser);
  yield console.log({ user });
  yield console.log(cartItems);

  yield call(updateCartInDb, user.id, cartItems);
}

function* fetchCartItems() {
  const user = yield select(selectCurrentUser);
  if (!user) {
    return;
  }

  console.log({ user });

  const cartItems = yield call(fetchCartFromDb, user.id);
  console.log({ cartItems });
  if (cartItems) {
    console.log(cartItems);
    yield put(loadCart(cartItems));
  }
}

function* watchUserSignIn() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCartItems);
}

function* watchUserSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, clearCartSagas);
}

function* watchAddItem() {
  yield takeLatest(CartTypes.ADD_ITEM, updateCart);
}

function* watchRemoveItem() {
  yield takeLatest(CartTypes.REMOVE_ITEM, updateCart);
}

function* watchChangeQuantity() {
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
