import React from "react";
import {
  AppFormInput,
  AppFormInputLabel,
  GroupContainer,
} from "./form-input.styles";

export const FormInput = ({ label, handleChange, ...otherProps }) => (
  <GroupContainer>
    <AppFormInput onChange={handleChange} {...otherProps}></AppFormInput>
    {label ? (
      <AppFormInputLabel {...otherProps}>{label}</AppFormInputLabel>
    ) : null}
  </GroupContainer>
);
