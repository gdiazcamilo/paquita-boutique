import CartTypes from "./cart.types";

const INITIAL_STATE = {
  visible: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartTypes.TOGGLE_CART_PREVIEW:
      return {
        ...state,
        visible: !state.visible,
      };
    default:
      return state;
  }
};

export default cartReducer;
