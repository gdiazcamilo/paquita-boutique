import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItemCount } from "../../redux/cart/cart.selectors";
import { toggleCartPreview } from "../../redux/cart/cart.actions";

import ShoppingBagIcon from "./shopping-bag.svg";
import {
  ItemCountText,
  ShoppingIcon,
  CartIconContainer,
} from "./cart-icon.styles";

const CartIcon = ({ toggleCartPreview, itemCount }) => (
  <CartIconContainer onClick={toggleCartPreview}>
    <ShoppingIcon src={ShoppingBagIcon} alt='[  ]' />
    <ItemCountText>{itemCount}</ItemCountText>
  </CartIconContainer>
);

const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemCount,
});

const mapDispatchToProps = {
  toggleCartPreview: () => toggleCartPreview(),
};
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
