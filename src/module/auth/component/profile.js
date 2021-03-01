import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AccountCircle,
  ExitToApp,
  Settings,
  Help,
  MonetizationOn,
  Phone,
  Person,
} from "@material-ui/icons";
import authDispatcher from "../action";
import { loadFromStorage } from "@/utils/storage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    width: "40px",
    height: "40px",
    color: "white",
  },
  listIcon: {
    marginRight: "10px",
  },
}));

function Profile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const [user, setUser] = useState([]);

  useEffect(() => {
    const { accessToken } = loadFromStorage("user") || {};

    if (accessToken) {
      authDispatcher.getInforUser((result) => {
        setUser(result);
      });
    }
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleLogout = () => {
    authDispatcher.logout();
    window.location.replace("/");
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <AccountCircle className={classes.avatar} />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem>
                    Signed in as <br /> {user.email}
                  </MenuItem>
                  <MenuItem>
                    <Person className={classes.listIcon} />
                    {user.fullName}
                  </MenuItem>
                  <MenuItem>
                    <Phone className={classes.listIcon} />
                    {user.numberPhone}
                  </MenuItem>
                  <MenuItem>
                    <MonetizationOn className={classes.listIcon} />
                    Account Balance <br /> {user.accountBalance} VND
                  </MenuItem>
                  <MenuItem>
                    <Help className={classes.listIcon} />
                    Help
                  </MenuItem>
                  <MenuItem>
                    <Settings className={classes.listIcon} />
                    Setting
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ExitToApp className={classes.listIcon} />
                    Sign out
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default Profile;
