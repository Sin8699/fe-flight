import React from "react";
import "./style.scss";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import authDispatcher from "../../module/auth/action";

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      hashPassword: formData.get("password"),
    };
    authDispatcher.login(data, () => window.location.replace("/"));
  };
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
              label="Email"
              name="email"
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
            <a href="/forgot-password">
              <p className="link-forgot-password">Forgot password?</p>
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
