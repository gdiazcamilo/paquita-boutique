import "./cart-icon.styles.scss";

import ShoppingBagIcon from "./shopping-bag.svg";

const CartIcon = () => (
  <div className='cart-icon'>
    <img className='shopping-icon' src={ShoppingBagIcon} alt='[  ]' />
    <span className='item-count'>0</span>
  </div>
);

export default CartIcon;
