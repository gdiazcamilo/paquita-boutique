import CartTypes from "./cart.types";
import { addItemToCart } from "./cart.utils";

const INITIAL_STATE = {
  visible: false,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case CartTypes.TOGGLE_CART_PREVIEW:
      return {
        ...state,
        visible: !state.visible,
      };
    case CartTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, payload),
      };
    case CartTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload),
      };
    case CartTypes.DECREASE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload && item.quantity > 1
            ? { ...item, quantity: --item.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
