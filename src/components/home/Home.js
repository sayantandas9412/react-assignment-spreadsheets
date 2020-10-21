import React from "react";
import "./Home.styles.scss";

const Home = (props) => {
  function handleButtonClick() {
    props.history.push("/selectSource");
  }
  return (
    <div className="home-container">
      <div className="heading">
        <h1>What would you like to do today ?</h1>
        <p>
          Welcome to Airboxr. Lets start with the task you want to accomplish
          today
        </p>
      </div>
      <div className="fetch-buttons">
        <button className="button button-import" onClick={handleButtonClick}>
          Import Data
        </button>
        <button className="button button-lookup" onClick={handleButtonClick}>
          Lookup Data
        </button>
      </div>
    </div>
  );
};
export default Home;
