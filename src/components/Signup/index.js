import React, { useState } from "react";
import "./style.scss";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import authDispatcher from "../../module/auth/action";

function Signup() {
  const [error, setError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if (formData.get("password") === formData.get("confirmPassword")) {
      const data = {
        username: formData.get("fullName"),
        password: formData.get("password"),
        email: formData.get("email"),
        fullName: formData.get("fullName"),
        numberPhone: formData.get("phone"),
        accountBalance: 0,
      };

      authDispatcher.register(data, (result) => {
        if (result?.message === "User created successfully") {
          const dataLogin = {
            email: formData.get("email"),
            hashPassword: formData.get("password"),
          };
          authDispatcher.login(dataLogin, () => window.location.replace("/"));
        }
      });
    } else {
      setError(true);
    }
  };
  return (
    <div className="signup">
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
            {error && (
              <p className="error">
                Confirm password does not match with password
              </p>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Full Name"
              name="fullName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Phone"
              name="phone"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
