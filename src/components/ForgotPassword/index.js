import React from "react";
import "./style.scss";
import { Avatar, Button, TextField, Typography } from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

function ForgotPassword() {
  const handleSubmit = () => {};
  return (
    <div className="forgot-password">
      <div className="container">
        <div className="form-email">
          <Avatar>
            <AlternateEmailIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset your password
          </Typography>
          <p>
            Enter your user account's verified email address and we will send
            you a password reset link.
          </p>
          <form className="form-submit" onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoComplete="email"
            />
            <div className="submit">
              <Button type="submit" variant="contained" className="btn-submit">
                Send password reset email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
