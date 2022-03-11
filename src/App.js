import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setCurrentUser } from "./redux/user/user.actions";
import "./App.css";

import { HomePage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";
import { authorizer, saveUser } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

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
          <Route path='/sign-in' element={<SignUpAndSignIn />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </div>
    );
  }
}

export default connect(null, { setCurrentUser })(App);
