import React from "react";

import {
  ItemDetailContainer,
  CartItemContainer,
} from "./cart-dropdown-item.styles";

const CartDropdownItem = ({ item: { imageUrl, name, price, quantity } }) => (
  <CartItemContainer>
    <img src={imageUrl} alt='item'></img>
    <ItemDetailContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailContainer>
  </CartItemContainer>
);

export default CartDropdownItem;
