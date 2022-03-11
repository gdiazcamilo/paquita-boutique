import React from "react";
import { connect } from "react-redux";

import "./header.styles.scss";
import Logo from "./crown.svg";
// import { ReactComponent as Logo } from "./crown.svg";

import { Link } from "react-router-dom";
import { authorizer } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps, null)(Header);
