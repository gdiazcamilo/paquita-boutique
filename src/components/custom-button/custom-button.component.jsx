import React from "react";
import { AppButton } from "./custom-button.styles";

export const CustomButton = ({ children, ...otherProps }) => (
  <AppButton {...otherProps}>{children}</AppButton>
);
