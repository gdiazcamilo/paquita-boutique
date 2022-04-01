import React from "react";

import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { createStructuredSelector } from "reselect";

import { selectCurrentUser } from "./redux/user/user.selectors";
import { setCurrentUser } from "./redux/user/user.actions";
import { loadCollections } from "./redux/catalog/catalog.actions";

import {
  firestore,
  convertCollectionsSnapshotToObject,
} from "./firebase/firebase.utils";
import { authorizer, saveUser } from "./firebase/firebase.utils";

import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";

import "./App.css";
import WithSpinner from "./components/with-spinner/with-spinner.component";

const HomePageWithSpinner = WithSpinner(HomePage);
const ShopPageWithSpinner = WithSpinner(ShopPage);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
    };

    this.unsubscribeFromAuthChanged = null;
    this.unsubscribeFromCollections = null;
  }

  componentDidMount() {
    const collectionRef = collection(firestore, "collections");
    this.unsubscribeFromCollections = onSnapshot(
      collectionRef,
      (collectionsSnapshot) => {
        const collectionsObject =
          convertCollectionsSnapshotToObject(collectionsSnapshot);
        this.props.loadCollections(collectionsObject);
        this.setState({ isLoading: false });
      }
    );

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
          setCurrentUser({ id: userRef.id, ...snapshot.data() });
        });
      }
    );
  }

  componentWillUnmount() {
    this.unsubscribeFromAuthChanged();
    this.unsubscribeFromCollections();
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
          <Route
            path='/'
            element={
              <HomePageWithSpinner
                isLoading={this.state.isLoading}
                {...this.props}
              />
            }
          />
          <Route
            path='/shop/*'
            element={
              <ShopPageWithSpinner
                isLoading={this.state.isLoading}
                {...this.props}
              />
            }
          />
          <Route path='/checkout' element={<CheckoutPage />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = { setCurrentUser, loadCollections };
export default connect(mapStateToProps, mapDispatchToProps)(App);
