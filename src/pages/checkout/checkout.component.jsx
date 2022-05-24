import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  selectCartTotalPrice,
  selectCartItems,
} from "../../redux/cart/cart.selectors";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutPageContainer,
  CheckoutHeader,
  HeaderBlock,
  TotalContainer,
  WarningContainer,
} from "./checkout.styles.jsx";

const CheckoutPage = ({ cartItems, total }) => (
  <CheckoutPageContainer>
    <CheckoutHeader>
      <HeaderBlock>
        <span>Product</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Description</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Quantity</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Price</span>
      </HeaderBlock>
      <HeaderBlock>
        <span>Remove</span>
      </HeaderBlock>
    </CheckoutHeader>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>Total ${total}</TotalContainer>
    <StripeCheckoutButton amount={total} />
    <WarningContainer>
      <p>Use the following credit card for payments:</p>
      <p>4242 4242 4242 4242 - Exp: 01/23 - CVV: 123</p>
    </WarningContainer>
  </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotalPrice,
});
export default connect(mapStateToProps, null)(CheckoutPage);
