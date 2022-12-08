import React from "react";
import {
  AppFormInput,
  AppFormInputLabel,
  GroupContainer,
} from "./form-input.styles";

export const FormInput = ({ label, handleChange, ...otherProps }) => (
  <GroupContainer>
    <AppFormInput
      id={label ? label.replace(" ", "-") : null}
      onChange={handleChange}
      {...otherProps}
    ></AppFormInput>
    {label ? (
      <AppFormInputLabel htmlFor={label.replace(" ", "-")} {...otherProps}>
        {label}
      </AppFormInputLabel>
    ) : null}
  </GroupContainer>
);
