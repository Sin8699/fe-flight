import React, { useState } from "react";
import "./style.scss";
import Profile from "../../module/auth/component/profile";
import { loadFromStorage } from "@/utils/storage";
import { get } from "lodash";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { ROLE_PERMISSION, urlLabel } from "@/constants/permission";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const { accessToken } = loadFromStorage("user") || {};
  const role = useSelector((state) => get(state, "auth.userInfo.role"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePath = (path) => {
    history.push(`/${path}`);
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
                <Link to="/login" className="link-btn">
                  Sign in
                </Link>
                <Link to="/register" className="link-btn sign-up">
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="link-group">
                <Link to={`/${urlLabel.flightManagement}`} className="link-btn">
                  Book Ticket
                </Link>
                <Link to={`/${urlLabel.saleHistory}`} className="link-btn">
                  Booking History
                </Link>
                {role === ROLE_PERMISSION.Admin && (
                  <React.Fragment>
                    <Link
                      to={`/${urlLabel.airportManagement}`}
                      className="link-btn"
                    >
                      Airport
                    </Link>
                    <Link
                      to={`/${urlLabel.middleAirport}`}
                      className="link-btn"
                    >
                      Middle Airport
                    </Link>
                    <Link
                      to={`/${urlLabel.userManagement}`}
                      className="link-btn"
                    >
                      User Management
                    </Link>
                  </React.Fragment>
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
                  <MenuItem
                    onClick={() => handleChangePath(urlLabel.flightManagement)}
                  >
                    Book Ticket
                  </MenuItem>
                  {role === ROLE_PERMISSION.Admin && (
                    <React.Fragment>
                      <MenuItem
                        onClick={() =>
                          handleChangePath(urlLabel.airportManagement)
                        }
                      >
                        Airport
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleChangePath(urlLabel.middleAirport)}
                      >
                        Middle Airport
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handleChangePath(urlLabel.userManagement)
                        }
                      >
                        User Management
                      </MenuItem>
                    </React.Fragment>
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
