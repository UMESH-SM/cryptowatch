import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link className="header__appNameLink" to="/home">
        <div className="header__appName">CryptoWatch</div>
      </Link>
      <div className="header__navbar">
        <Link className="header__links" to="/home">
          Home
        </Link>
        <Link className="header__links" to="/view">
          View
        </Link>
      </div>
    </div>
  );
}

export default Header;
