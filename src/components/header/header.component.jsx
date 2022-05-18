import React, { useContext } from "react";

import { authorizer } from "../../firebase/firebase.utils";
import CurrentUserContext from "../../contexts/current-user/current-user.context";
import CartContext from "../../contexts/cart/cart.context";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";
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

const Header = () => {
  const { visible } = useContext(CartContext);
  const currentUser = useContext(CurrentUserContext);

  function signInOption() {
    if (currentUser) {
      return (
        <LinkOption as='div' onClick={() => authorizer.signOut()}>
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

export default Header;
