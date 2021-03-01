import React, { useState } from "react";
import "./style.scss";
import Profile from "../../module/auth/component/profile";
import { loadFromStorage } from "@/utils/storage";
import { get } from "lodash";
import { Menu, MenuItem, Button } from "@material-ui/core";

const Header = () => {
  const { accessToken, role } = loadFromStorage("user") || {};

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-menu" : undefined;

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
            {!accessToken ? (
              <div>
                <a href="/login" className="link-btn">
                  Sign in
                </a>
                <a href="/register" className="link-btn sign-up">
                  Sign up
                </a>
              </div>
            ) : (
              <div className="link-group">
                {accessToken && role !== "ADMIN" && (
                  <a href="/flight" className="link-btn">
                    Book Ticket
                  </a>
                )}
                <Profile />
              </div>
            )}
          </div>
          <div className="had-responsive">
            <Button
              aria-controls={id}
              aria-haspopup="true"
              onClick={handleClick}
            >
              Menu
            </Button>
            <Menu
              id={id}
              open={open}
              anchorEl={anchorEl}
              keepMounted
              onClose={handleClose}
            >
              {!accessToken ? (
                <div>
                  <MenuItem onClick={() => window.location.replace("/login")}>
                    Sign in
                  </MenuItem>
                  <MenuItem
                    onClick={() => window.location.replace("/register")}
                  >
                    Sign up
                  </MenuItem>
                </div>
              ) : (
                <div className="background-color-menu-res">
                  {accessToken && role !== "ADMIN" && (
                    <MenuItem
                      onClick={() => window.location.replace("/flight")}
                    >
                      Book Ticket
                    </MenuItem>
                  )}
                </div>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
