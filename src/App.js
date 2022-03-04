import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { HomePage } from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { Header } from "./components/header/header.component";
import { SignUpAndSignIn } from "./pages/sign-up-and-sign-in/sign-up-and-sign-in.component";
import { authorizer, saveUser } from "./firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuthChanged = null;

  componentDidMount() {
    this.unsubscribeFromAuthChanged = authorizer.onAuthStateChanged(
      async (userAuth) => {
        console.log("start onAuthStateChanged");
        console.log(userAuth);
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
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/sign-in' element={<SignUpAndSignIn />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
