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
    default:
      return state;
  }
};

export default cartReducer;
