import React from "react";
import "./SelectSource.styles.scss";
import { withRouter } from "react-router-dom";
import facebookAdsLogo from "../../assets/facebook-ads-logo.png";
import googleAdsLogo from "../../assets/google-ads-logo.png";
import googleAnalyticsLogo from "../../assets/google-analytics-logo.png";
import mailChimpLogo from "../../assets/mailchimp-logo.png";

const SelectSource = ({ name, id, handleFavoriteClick, favorite, history }) => {
  let imageSource = "";

  if (id === 114) {
    imageSource = mailChimpLogo;
  } else if (id === 115) {
    imageSource = googleAnalyticsLogo;
  } else if (id === 116) {
    imageSource = facebookAdsLogo;
  } else {
    imageSource = googleAdsLogo;
  }

  const handleSourceClick = () => {
    history.push(`/selectSource/${name}`);
  };

  let favorites = favorite ? "marked" : "un-marked";
  return (
    <div className="selectSource-container" id={id} onClick={handleSourceClick}>
      <p>{name}</p>
      <img src={imageSource} alt="source" />
      <div
        className={`favorite-icon ${favorites}`}
        onClick={handleFavoriteClick}
        id={id}
      ></div>
    </div>
  );
};
export default withRouter(SelectSource);
