import {
  watchUserSignOut,
  clearCartSagas,
  watchAddItem,
  updateCart,
  watchRemoveItem,
  watchChangeQuantity,
  watchUserSignIn,
  fetchCartItems,
} from "./cart.sagas";
import { put, takeLatest, select, call } from "redux-saga/effects";
import { selectCartItems } from "./cart.selectors";
import { selectCurrentUser } from "../user/user.selectors";
import UserTypes from "../user/user.types";
import CartTypes from "./cart.types";
import { clearCart, loadCart } from "./cart.actions";
import { updateCartInDb, fetchCartFromDb } from "../../firebase/firebase.utils";

it("clears cart items on user sign out", () => {
  const generator = watchUserSignOut();
  expect(generator.next().value).toEqual(
    takeLatest(UserTypes.SIGN_OUT_START, clearCartSagas)
  );

  const clearCartGenerator = clearCartSagas();
  expect(clearCartGenerator.next().value).toEqual(put(clearCart()));
});

it("updates cart when item is added", () => {
  const addItemGenerator = watchAddItem();
  expect(addItemGenerator.next().value).toEqual(
    takeLatest(CartTypes.ADD_ITEM, updateCart)
  );
});

it("updates cart when item is removed", () => {
  const removeItemGenerator = watchRemoveItem();
  expect(removeItemGenerator.next().value).toEqual(
    takeLatest(CartTypes.REMOVE_ITEM, updateCart)
  );
});

it("updates cart when item quantity is changed", () => {
  const changeQuantityGenerator = watchChangeQuantity();
  expect(changeQuantityGenerator.next().value).toEqual(
    takeLatest(CartTypes.DECREASE_ITEM_QUANTITY, updateCart)
  );
});

it("updates cart", () => {
  const updateCartGenerator = updateCart();

  const state = {
    cart: { cartItems: [{ id: 34 }] },
    user: { currentUser: { id: 15 } },
  };
  expect(updateCartGenerator.next().value).toEqual(select(selectCartItems));
  expect(updateCartGenerator.next(state.cart.cartItems).value).toEqual(
    select(selectCurrentUser)
  );

  expect(updateCartGenerator.next(state.user.currentUser).value).toEqual(
    call(updateCartInDb, state.user.currentUser.id, state.cart.cartItems)
  );
});

it("loads cart items from db on user sign in", () => {
  const userSignInGen = watchUserSignIn();
  expect(userSignInGen.next().value).toEqual(
    takeLatest(UserTypes.SIGN_IN_SUCCESS, fetchCartItems)
  );
});

it("fetches cart items from db", () => {
  const fetchCartItemsGen = fetchCartItems();

  const mockUser = { id: 10 };
  const mockCartItems = [{ id: 1 }, { id: 2 }];
  expect(fetchCartItemsGen.next().value).toEqual(select(selectCurrentUser));

  expect(fetchCartItemsGen.next(mockUser).value).toEqual(
    call(fetchCartFromDb, mockUser.id)
  );

  expect(fetchCartItemsGen.next(mockCartItems).value).toEqual(
    put(loadCart(mockCartItems))
  );
});
