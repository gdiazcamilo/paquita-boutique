import React from "react";
import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrappedComponent) => {
  return ({ isLoading, props }) =>
    isLoading ? <Spinner /> : <WrappedComponent {...props} />;
};

export default WithSpinner;
