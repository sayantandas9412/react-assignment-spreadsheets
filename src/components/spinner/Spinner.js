import React from "react";
import "./Spinner.styles.scss";

const Spinner = () => {
  return (
    <div className="backdrop">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    </div>
  );
};
export default Spinner;
