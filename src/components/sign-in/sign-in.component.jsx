import React from "react";
import { connect } from "react-redux";

import {
  signInWithGoogle,
  signInWithEmailAndPassword,
} from "../../redux/user/user.actions";

import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";

import { SignInContainer, ButtonsContainer } from "./sign-in.styles";

class SignIn extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const { signInWithEmailAndPassword } = this.props;

    signInWithEmailAndPassword({ email, password });
  };

  render() {
    return (
      <SignInContainer>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='email'
            name='email'
            label='Email'
            value={this.state.email}
            handleChange={this.handleChange}
          />
          <FormInput
            type='password'
            name='password'
            label='Password'
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <ButtonsContainer>
            <CustomButton type='submit'>Sign In</CustomButton>
            <CustomButton
              type='button'
              isGoogleSignIn={true}
              onClick={this.props.signInWithGoogle}
            >
              Sign In with Google
            </CustomButton>
          </ButtonsContainer>
        </form>
      </SignInContainer>
    );
  }
}

const mapDispatchToProps = { signInWithGoogle, signInWithEmailAndPassword };
export default connect(null, mapDispatchToProps)(SignIn);
