import React, { useState } from "react";
import { connect } from "react-redux";

import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "../../redux/user/user.actions";

import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

const SignIn = ({ signInWithEmailAndPassword, signInWithGoogle }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const { email, password } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword({ email, password });
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          label='Email'
          value={email}
          handleChange={handleChange}
        />
        <FormInput
          type='password'
          name='password'
          label='Password'
          value={password}
          handleChange={handleChange}
          required
        />
        <ButtonsContainer>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton
            type='button'
            isGoogleSignIn={true}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </CustomButton>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

const mapDispatchToProps = { signInWithGoogle, signInWithEmailAndPassword };
export default connect(null, mapDispatchToProps)(SignIn);
