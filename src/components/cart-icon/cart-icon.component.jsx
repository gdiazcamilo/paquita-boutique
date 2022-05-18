import React, { useContext } from "react";
import CartContext from "../../contexts/cart/cart.context";

import ShoppingBagIcon from "./shopping-bag.svg";
import {
  ItemCountText,
  ShoppingIcon,
  CartIconContainer,
} from "./cart-icon.styles";

const CartIcon = () => {
  const { toggleCartPreview, itemCount } = useContext(CartContext);
  return (
    <CartIconContainer onClick={toggleCartPreview}>
      <ShoppingIcon src={ShoppingBagIcon} alt='[  ]' />
      <ItemCountText>{itemCount}</ItemCountText>
    </CartIconContainer>
  );
};

export default CartIcon;
