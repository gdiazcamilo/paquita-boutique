import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { authorizer } from "../../firebase/firebase.utils";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import Logo from "./crown.svg";
// import { ReactComponent as Logo } from "./crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser, visible }) => {
  function signInOption() {
    if (currentUser) {
      return (
        <div className='option' onClick={() => authorizer.signOut()}>
          SIGN OUT
        </div>
      );
    } else {
      return (
        <Link className='option' to='/sign-in'>
          SIGN IN
        </Link>
      );
    }
  }

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <img src={Logo} alt='Logo' className='logo' />
        {/* <Logo className='logo' /> */}
      </Link>
      <div className='options'>
        <Link className='option' to='/shop'>
          SHOP
        </Link>
        <Link className='option' to='/'>
          CONTACT
        </Link>
        {signInOption()}
        <CartIcon />
      </div>
      {visible ? <CartDropdown /> : null}
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, cart: { visible } }) => ({
  currentUser,
  visible,
});

export default connect(mapStateToProps, null)(Header);
