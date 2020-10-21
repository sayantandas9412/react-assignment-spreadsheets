import React from "react";
import "./Error.styles.scss";

const Error = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <h1>Something went wrong !!!</h1>
      <h3>{errorMessage}</h3>
      <p>Click on the HOME button to go back</p>
    </div>
  );
};
export default Error;
