import React from "react";
import "./Header.styles.scss";
import homeIcon from "../../assets/home-icon.png";
import chatIcon from "../../assets/chat-icon-white.png";

const Header = (props) => {
  return (
    <div className="header-container">
      <span className="home-icon" onClick={() => props.history.push("/")}>
        <img src={homeIcon} alt="HomeIcon" />
      </span>
      <div className="chat-button">
        <span className="chat-icon">
          <img src={chatIcon} alt="chatIcon" />
        </span>
        <span className="chat-label">CHAT</span>
      </div>
    </div>
  );
};
export default Header;
