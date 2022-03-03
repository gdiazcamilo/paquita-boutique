import React from "react";

import "./sign-up-and-sign-in.styles.scss";

import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

export const SignUpAndSignIn = () => (
  <div className='sign-up-and-sign-in'>
    <SignIn />
    <SignUp />
  </div>
);
