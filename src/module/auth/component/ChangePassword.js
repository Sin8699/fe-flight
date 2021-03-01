import React, { useState } from "react";

import { ButtonEnhance } from "@/componentsUI";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import authDispatcher from "../action";

const ChangePassword = ({ open, close }) => {
  const [formValue, setFormValue] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    close(false);
  };

  const handleSubmit = () => {
    if (formValue.newPass !== formValue.confirmPass) {
      setError(true);
      return;
    } else {
      const data = {
        oldPass: formValue.oldPass,
        newPass: formValue.newPass,
      };
      authDispatcher.changePassword(data, (result) => {
        setMessage(result.message);
        setTimeout(() => {
          close(false);
        }, 5000);
      });
    }
  };

  const handleChangeForm = (key) => (e) => {
    setFormValue({ ...formValue, [key]: e.target.value });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message
              ? message
              : "Enter old password and new password to change password."}
          </DialogContentText>
          {!message && (
            <>
              <TextField
                margin="dense"
                id="oldPass"
                label="Old password"
                type="password"
                fullWidth
                required
                onChange={handleChangeForm("oldPass")}
              />
              <TextField
                margin="dense"
                id="newPass"
                label="newPass"
                type="password"
                fullWidth
                required
                onChange={handleChangeForm("newPass")}
                error={error}
              />
              <TextField
                margin="dense"
                id="confirmPass"
                label="Confirm Password"
                type="password"
                fullWidth
                required
                onChange={handleChangeForm("confirmPass")}
                error={error}
              />
              {error && (
                <p className="error">
                  Confirm password or old password incorrect
                </p>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!message && (
            <>
              <ButtonEnhance
                background="#E9E9E9"
                color="black"
                backgroundHover="#ccc"
                onClick={handleClose}
              >
                Cancel
              </ButtonEnhance>

              <ButtonEnhance onClick={handleSubmit}>Change</ButtonEnhance>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangePassword;
