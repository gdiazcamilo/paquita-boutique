import CartTypes from "./cart.types";

export const toggleCartPreview = () => ({
  type: CartTypes.TOGGLE_CART_PREVIEW,
});

export const addItem = (item) => ({
  type: CartTypes.ADD_ITEM,
  payload: item,
});
