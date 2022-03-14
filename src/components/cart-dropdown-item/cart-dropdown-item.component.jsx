import React from "react";

import "./cart-dropdown-item.styles.scss";

const CartDropdownItem = ({ item: { imageUrl, name, price, quantity } }) => (
  <div className='cart-item'>
    <img src={imageUrl} alt='item'></img>
    <div className='item-details'>
      <span className='name'>{name}</span>
      <span className='price'>
        {quantity} x ${price}
      </span>
    </div>
  </div>
);

export default CartDropdownItem;
