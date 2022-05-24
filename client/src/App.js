import React, { useEffect } from "react";

import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkSignIn } from "./redux/user/user.actions";
import { loadCollectionsStart } from "./redux/catalog/catalog.actions";

import WithSpinnerContainer from "./components/with-spinner/with-spinner.container.component";
import HomePageContainer from "./pages/homepage/homepage.container.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";

import GlobalStyles from "./global.styles";
import ShopPage from "./pages/shop/shop.component";

const ShopPageWithSpinner = WithSpinnerContainer(ShopPage);

const App = ({ checkSignIn, loadCollections, currentUser }) => {
  useEffect(() => checkSignIn(), [checkSignIn]);
  useEffect(() => loadCollections(), [loadCollections]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route
          path='/sign-in'
          element={currentUser ? <Navigate to='/' /> : <SignUpAndSignIn />}
        />
        <Route path='/' element={<HomePageContainer />} />
        <Route path='/shop/*' element={<ShopPageWithSpinner />} />
        <Route path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = {
  loadCollections: loadCollectionsStart,
  checkSignIn,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
