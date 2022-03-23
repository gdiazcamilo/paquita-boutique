import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartTotalPrice,
  selectCartItems,
} from "../../redux/cart/cart.selectors";

import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const CheckoutPage = ({ cartItems, total }) => (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='checkout-block'>
        <span>Product</span>
      </div>
      <div className='checkout-block'>
        <span>Description</span>
      </div>
      <div className='checkout-block'>
        <span>Quantity</span>
      </div>
      <div className='checkout-block'>
        <span>Price</span>
      </div>
      <div className='checkout-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>Total ${total}</div>
    <StripeCheckoutButton amount={total} />
    <div className='test-warning'>
      <p>Use the following credit card for payments:</p>
      <p>4242 4242 4242 4242 - Exp: 01/23 - CVV: 123</p>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotalPrice,
});
export default connect(mapStateToProps, null)(CheckoutPage);
