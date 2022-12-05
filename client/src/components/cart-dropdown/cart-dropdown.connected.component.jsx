import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartPreview } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";

import CartDropdown from "./cart-dropdown.component";

const CartDropdownWrapper = ({ cartItems, dispatch }) => (
  <CartDropdown
    cartItems={cartItems}
    toggleCartPreview={() => dispatch(toggleCartPreview())}
  />
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps, null)(CartDropdownWrapper);
