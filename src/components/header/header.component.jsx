import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { selectCartVisible } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { authorizer } from "../../firebase/firebase.utils";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";
import Logo from "./paquita.logo.jpg";
// import { ReactComponent as Logo } from "./crown.svg";
import "./header.styles.scss";
import { createStructuredSelector } from "reselect";

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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  visible: selectCartVisible,
});

export default connect(mapStateToProps, null)(Header);
