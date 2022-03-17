import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { useNavigate } from "react-router-dom";

import { toggleCartPreview } from "../../redux/cart/cart.actions";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import CartDropdownItem from "../cart-dropdown-item/cart-dropdown-item.component";
import { CustomButton } from "../custom-button/custom-button.component";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ cartItems, dispatch }) => {
  const navigate = useNavigate();
  console.log(toggleCartPreview);

  return (
    <div className='cart-dropdown'>
      <div className='cart-item-list'>
        {cartItems.length ? (
          cartItems.map((item) => (
            <CartDropdownItem key={item.id} item={item} />
          ))
        ) : (
          <span className='empty-cart'>Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          navigate("/checkout");
          dispatch(toggleCartPreview());
        }}
      >
        SHOW ALL
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default connect(mapStateToProps, null)(CartDropdown);
