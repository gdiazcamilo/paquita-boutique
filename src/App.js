import React from "react";

import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";
import { authorizer, saveUser } from "./firebase/firebase.utils";

import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import { HomePage } from "./pages/homepage/homepage.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";

import "./App.css";
import CollectionPage from "./pages/collection/collection.component";

class App extends React.Component {
  unsubscribeFromAuthChanged = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuthChanged = authorizer.onAuthStateChanged(
      async (userAuth) => {
        if (!userAuth) {
          setCurrentUser(null);
          return;
        }

        const userRef = await saveUser(userAuth);
        if (!userRef) {
          setCurrentUser(null);
          return;
        }

        onSnapshot(userRef, (snapshot) => {
          console.log("snapshopt data");
          console.log(snapshot.data());
          setCurrentUser({ id: userRef.id, ...snapshot.data() });
        });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuthChanged();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route
            path='/sign-in'
            element={
              this.props.currentUser ? <Navigate to='/' /> : <SignUpAndSignIn />
            }
          />
          <Route path='/' element={<HomePage />} />
          <Route path='/shop'>
            <Route path='' element={<ShopPage />} />
            <Route path=':collectionName' element={<CollectionPage />} />
          </Route>

          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
export default connect(mapStateToProps, { setCurrentUser })(App);
