import React from "react";
import "./cart-icon.styles.scss";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItemCount } from "../../redux/cart/cart.selectors";
import { toggleCartPreview } from "../../redux/cart/cart.actions";
import ShoppingBagIcon from "./shopping-bag.svg";

const CartIcon = ({ toggleCartPreview, itemCount }) => (
  <div className='cart-icon' onClick={toggleCartPreview}>
    <img className='shopping-icon' src={ShoppingBagIcon} alt='[  ]' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemCount,
});

const mapDispatchToProps = {
  toggleCartPreview: () => toggleCartPreview(),
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
