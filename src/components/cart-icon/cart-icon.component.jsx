import "./cart-icon.styles.scss";

import { connect } from "react-redux";

import { toggleCartPreview } from "../../redux/cart/cart.actions";
import ShoppingBagIcon from "./shopping-bag.svg";

const CartIcon = ({ toggleCartPreview }) => (
  <div className='cart-icon' onClick={toggleCartPreview}>
    <img className='shopping-icon' src={ShoppingBagIcon} alt='[  ]' />
    <span className='item-count'>0</span>
  </div>
);

const mapDispatchToProps = {
  toggleCartPreview: () => toggleCartPreview(),
};
export default connect(null, mapDispatchToProps)(CartIcon);
