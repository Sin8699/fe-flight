import React from "react";
import "./style.scss";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function Login() {
  const handleSubmit = () => {};
  return (
    <div className="login">
      <div className="container">
        <div
          className="background-login"
          style={{ backgroundImage: "url(/images/280727.jpg" }}
        ></div>
        <div className="form-login">
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
            <div className="submit">
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </div>
            <a href="/">
              <p className="link-forgot-password">Forgot password?</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
