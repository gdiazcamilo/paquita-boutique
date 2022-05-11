import CartTypes from "./cart.types";

export const toggleCartPreview = () => ({
  type: CartTypes.TOGGLE_CART_PREVIEW,
});

export const addItem = (item) => ({
  type: CartTypes.ADD_ITEM,
  payload: item,
});

export const removeItem = (itemId) => ({
  type: CartTypes.REMOVE_ITEM,
  payload: itemId,
});

export const decreaseItemQuantity = (itemId) => ({
  type: CartTypes.DECREASE_ITEM_QUANTITY,
  payload: itemId,
});

export const clearCart = () => ({ type: CartTypes.CLEAR_CART });
