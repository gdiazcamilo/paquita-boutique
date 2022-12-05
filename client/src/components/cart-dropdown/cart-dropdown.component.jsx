import React from "react";
import { useNavigate } from "react-router-dom";

import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";
import { CustomButton } from "../custom-button/custom-button.component";

import {
  CartDropdownContainer,
  CartItemListContainer,
  EmptyCartText,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, toggleCartPreview }) => {
  const navigate = useNavigate();

  const renderCartItems = (cartItems) => {
    if (cartItems.length) {
      return cartItems.map((item) => (
        <CartDropdownItem key={item.id} item={item} />
      ));
    } else {
      return <EmptyCartText>Your cart is empty</EmptyCartText>;
    }
  };

  return (
    <CartDropdownContainer>
      <CartItemListContainer>
        {renderCartItems(cartItems)}
      </CartItemListContainer>
      <CustomButton
        onClick={() => {
          navigate("/checkout");
          toggleCartPreview();
        }}
      >
        SHOW ALL
      </CustomButton>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
