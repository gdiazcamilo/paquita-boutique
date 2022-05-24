import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { toggleCartPreview } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";
import { CustomButton } from "../custom-button/custom-button.component";

import {
  CartDropdownContainer,
  CartItemListContainer,
  EmptyCartText,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, dispatch }) => {
  const navigate = useNavigate();
  console.log(toggleCartPreview);

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
          dispatch(toggleCartPreview());
        }}
      >
        SHOW ALL
      </CustomButton>
    </CartDropdownContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps, null)(CartDropdown);
