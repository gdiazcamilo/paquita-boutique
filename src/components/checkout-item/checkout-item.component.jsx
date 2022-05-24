import React from "react";
import { connect } from "react-redux";

import {
  removeItem,
  addItem,
  decreaseItemQuantity,
} from "../../redux/cart/cart.actions";

import {
  CheckoutItemContainer,
  ImageContainer,
  Text,
  QuantityContainer,
  RemoveButton,
} from "./checkout-item.styles";

const UNICODE_X = "&#10005";
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
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt='item' />
      </ImageContainer>
      <Text>{name}</Text>
      <QuantityContainer>
        <div
          onClick={() => decreaseItemQuantity(id)}
          dangerouslySetInnerHTML={{ __html: UNICODE_DOWN_ARROW }}
        ></div>
        <span>{quantity}</span>
        <div
          onClick={() => addItem(cartItem)}
          dangerouslySetInnerHTML={{ __html: UNICODE_UP_ARROW }}
        ></div>
      </QuantityContainer>
      <Text>${price}</Text>
      <RemoveButton
        onClick={() => removeItem(id)}
        dangerouslySetInnerHTML={{ __html: UNICODE_X }}
      />
    </CheckoutItemContainer>
  );
};

export default connect(null, { removeItem, addItem, decreaseItemQuantity })(
  CheckoutItem
);
