import React, { useEffect, lazy, Suspense } from "react";

import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkSignIn } from "./redux/user/user.actions";
import { loadCollectionsStart } from "./redux/catalog/catalog.actions";

import Header from "./components/header/header.component";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import GlobalStyles from "./global.styles";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const SignUpAndSignIn = lazy(() =>
  import("./pages/sign-up-and-sign-in/sign-up-and-sign-in.component")
);
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = ({ checkSignIn, loadCollections, currentUser }) => {
  useEffect(() => checkSignIn(), [checkSignIn]);
  useEffect(() => loadCollections(), [loadCollections]);

  return (
    <div>
      <GlobalStyles />
      <Header />
      <ErrorBoundary>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path='/sign-in'
              element={currentUser ? <Navigate to='/' /> : <SignUpAndSignIn />}
            />
            <Route path='/' element={<HomePage />} />
            <Route path='/shop/*' element={<ShopPage />} />
            <Route path='/checkout' element={<CheckoutPage />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
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
