import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartVisible } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { signOut } from "../../redux/user/user.actions";

import CartDropdown from "../cart-dropdown/cart-dropdown.connected.component";
import CartIcon from "../cart-icon/cart-icon.component";
import Logo from "./paquita.logo.jpg";
// import { ReactComponent as Logo } from "./crown.svg";

import {
  HeaderContainer,
  LogoContainer,
  LogoImage,
  OptionsContainer,
  LinkOption,
} from "./header.styles";

const Header = ({ currentUser, visible, signOut }) => {
  function signInOption() {
    if (currentUser) {
      return (
        <LinkOption as='div' onClick={() => signOut()}>
          SIGN OUT
        </LinkOption>
      );
    } else {
      return <LinkOption to='/sign-in'>SIGN IN</LinkOption>;
    }
  }

  return (
    <HeaderContainer>
      <LogoContainer to='/'>
        <LogoImage src={Logo} alt='Logo' />
        {/* <Logo className='logo' /> */}
      </LogoContainer>
      <OptionsContainer>
        <LinkOption to='/shop'>SHOP</LinkOption>
        <LinkOption to='/'>CONTACT</LinkOption>
        {signInOption()}
        <CartIcon />
      </OptionsContainer>
      {visible ? <CartDropdown /> : null}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  visible: selectCartVisible,
});

export default connect(mapStateToProps, { signOut })(Header);
