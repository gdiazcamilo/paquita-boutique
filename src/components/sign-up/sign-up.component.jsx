import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { authorizer, saveUser } from "../../firebase/firebase.utils";

import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";

import { SignUpContainer } from "./sign-up.styles";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user: userAuth } = await createUserWithEmailAndPassword(
        authorizer,
        email,
        password
      );

      await saveUser(userAuth, { displayName });

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <SignUpContainer>
        <h2>I do not have an account</h2>
        <span>Sign un with email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            label='Display Name'
            name='displayName'
            value={displayName}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='email'
            label='Email'
            name='email'
            value={email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            label='Password'
            name='password'
            value={password}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            type='password'
            label='Confirm Password'
            name='confirmPassword'
            value={confirmPassword}
            handleChange={this.handleChange}
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}

export default SignUp;
