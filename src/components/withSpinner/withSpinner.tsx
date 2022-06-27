import React from "react";

import classes from "./withSpinner.module.css";

const withSpinner = (WrappedComponent: React.ComponentType) => {
  const Spinner = ({ isLoading, ...props }: { isLoading?: boolean } & Partial<any>) => {
    return isLoading ? (
      <div className={`${classes.spinnerContainer} ${props.className}`}>
        <div className={classes.spinner} />
      </div>
    ) : (
      <WrappedComponent {...props} />
    );
  };
  return Spinner;
};

export default withSpinner;
