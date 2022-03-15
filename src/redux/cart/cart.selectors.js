import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((itemCount, cartItem) => itemCount + cartItem.quantity, 0)
);

export const selectCartVisible = createSelector(
  [selectCart],
  (cart) => cart.visible
);
