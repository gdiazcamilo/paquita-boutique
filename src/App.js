import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

import { authorizer, saveUser } from "./firebase/firebase.utils";
import CurrentUserContext from "./contexts/current-user/current-user.context";

import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import Header from "./components/header/header.component";
import { HomePage } from "./pages/homepage/homepage.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";

import "./App.css";
import CollectionPage from "./pages/collection/collection.component";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: undefined,
    };
  }

  unsubscribeFromAuthChanged = null;

  componentDidMount() {
    this.unsubscribeFromAuthChanged = authorizer.onAuthStateChanged(
      async (userAuth) => {
        if (!userAuth) {
          this.setState({ currentUser: null });
          return;
        }

        const userRef = await saveUser(userAuth);
        if (!userRef) {
          this.setState({ currentUser: null });
          return;
        }

        onSnapshot(userRef, (snapshot) => {
          this.setState({
            currentUser: { id: userRef.id, ...snapshot.data() },
          });
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
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />
        </CurrentUserContext.Provider>
        <Routes>
          <Route
            path='/sign-in'
            element={
              this.state.currentUser ? <Navigate to='/' /> : <SignUpAndSignIn />
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

export default App;
