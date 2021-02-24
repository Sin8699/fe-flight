import React, { useState } from "react";
import "./style.scss";
import Profile from "../../module/auth/component/profile";
import { loadFromStorage } from "../../utils/storage";

const Header = () => {
  const user = loadFromStorage("auth");
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
            {!user ? (
              <div>
                <a href="/login" className="link-btn">
                  Sign in
                </a>
                <a href="/register" className="link-btn sign-up">
                  Sign up
                </a>
              </div>
            ) : (
              <Profile />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
