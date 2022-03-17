import React from "react";
import { connect } from "react-redux";

import {
  removeItem,
  addItem,
  decreaseItemQuantity,
} from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

const UNICODE_EQUIS = "&#10005";
const UNICODE_DOWN_ARROW = "&#10094";
const UNICODE_UP_ARROW = "&#10095";

const CheckoutItem = ({
  cartItem,
  removeItem,
  addItem,
  decreaseItemQuantity,
}) => {
  const { id, imageUrl, name, quantity, price } = cartItem;
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div
          className='arrow'
          onClick={() => decreaseItemQuantity(id)}
          dangerouslySetInnerHTML={{ __html: UNICODE_DOWN_ARROW }}
        ></div>
        <span className='value'>{quantity}</span>
        <div
          className='arrow'
          onClick={() => addItem(cartItem)}
          dangerouslySetInnerHTML={{ __html: UNICODE_UP_ARROW }}
        ></div>
      </span>
      <span className='price'>${price}</span>
      <span
        className='remove-button'
        onClick={() => removeItem(id)}
        dangerouslySetInnerHTML={{ __html: UNICODE_EQUIS }}
      ></span>
    </div>
  );
};

export default connect(null, { removeItem, addItem, decreaseItemQuantity })(
  CheckoutItem
);
