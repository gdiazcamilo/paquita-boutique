import React, { useState } from "react";
import { connect } from "react-redux";

import { signUpStart } from "../../redux/user/user.actions";

import { FormInput } from "../form-input/form-input.component";
import { CustomButton } from "../custom-button/custom-button.component";

import { SignUpContainer } from "./sign-up.styles";

const SignUp = ({ signUpStart }) => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { displayName, email, password, confirmPassword } = formData;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart(email, password, displayName);
  };

  return (
    <SignUpContainer>
      <h2>I do not have an account</h2>
      <span>Sign un with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type='text'
          label='Display Name'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='email'
          label='Email'
          name='email'
          value={email}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          label='Password'
          name='password'
          value={password}
          handleChange={handleChange}
          required
        />
        <FormInput
          type='password'
          label='Confirm Password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          required
        />
        <CustomButton type='submit'>SIGN UP</CustomButton>
      </form>
    </SignUpContainer>
  );
};

export default connect(null, { signUpStart })(SignUp);
