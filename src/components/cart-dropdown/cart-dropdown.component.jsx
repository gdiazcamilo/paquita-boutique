import React from "react";
import { connect } from "react-redux";

import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";
import { CustomButton } from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems }) => (
  <div className='cart-dropdown'>
    <div className='cart-item-list'>
      {cartItems.map((item) => (
        <CartDropdownItem key={item.id} item={item} />
      ))}
    </div>
    <CustomButton>SHOW ALL</CustomButton>
  </div>
);

export default connect(
  (state) => ({ cartItems: state.cart.cartItems }),
  null
)(CartDropdown);
