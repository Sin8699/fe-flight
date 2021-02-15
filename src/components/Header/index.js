import React, { useState } from "react";
import "./style.scss";
import Profile from "../Profile";

const Header = () => {
  return (
    <div className="header">
      <div className="header-nav">
        <div className="nav-bar">
          <img
            className="logo"
            onClick={() => window.location.replace("/")}
            src="/images/logo-airport.svg"
            alt="logo"
          />
          <div className="not-responsive">
            <div>
              <a href="/login" className="link-btn">
                Log in
              </a>
              <a>/</a>
              <a href="/register" className="link-btn">
                Sign up
              </a>
            </div>
            {/* <Profile /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
