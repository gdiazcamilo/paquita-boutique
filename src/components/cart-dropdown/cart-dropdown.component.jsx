import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selectors";
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

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps, null)(CartDropdown);
