import React, { useContext } from "react";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
  CheckoutPageContainer,
  CheckoutHeader,
  HeaderBlock,
  TotalContainer,
  WarningContainer,
} from "./checkout.styles.jsx";
import CartContext from "../../contexts/cart/cart.context";

const CheckoutPage = () => {
  const { cartItems, getCartTotalPrice } = useContext(CartContext);

  return (
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
      <TotalContainer>Total ${getCartTotalPrice()}</TotalContainer>
      <StripeCheckoutButton amount={getCartTotalPrice()} />
      <WarningContainer>
        <p>Use the following credit card for payments:</p>
        <p>4242 4242 4242 4242 - Exp: 01/23 - CVV: 123</p>
      </WarningContainer>
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
