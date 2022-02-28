import React from "react";

import "./custom-button.styles.scss";

export const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  <button
    className={`custom-button ${isGoogleSignIn ? "google-sign-in" : ""}`}
    {...otherProps}
  >
    {" "}
    {children}{" "}
  </button>
);
