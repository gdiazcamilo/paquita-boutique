import React from "react";

import "./custom-button.styles.scss";

export const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`custom-button ${inverted ? "inverted" : ""} ${
      isGoogleSignIn ? "google-sign-in" : ""
    }`}
    {...otherProps}
  >
    {children}
  </button>
);
