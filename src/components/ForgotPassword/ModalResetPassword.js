import React, { useState } from "react";
import { DialogContent, TextField, Grid } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import authDispatcher from "../../module/auth/action";

const ModalResetPassword = ({ onClose }) => {
  const [formValue, setFormValue] = useState({});

  const handleChangeForm = (key) => (e) => {
    setFormValue({ ...formValue, [key]: e.target.value });
  };

  const handleSubmit = () => {
    const newPass = { newPassword: formValue.newPassword };
    authDispatcher.resetPassword(formValue.token, newPass, () =>
      window.location.replace("/login")
    );
  };

  return (
    <ModalPage>
      <DialogContent>
        <div className="header">
          Reset Password
          <ClearRounded
            style={{ cursor: "pointer", float: "right", color: "#CACFD3" }}
            onClick={onClose}
          />
        </div>
        <div className="body">
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              Check email. Enter token and new password.
            </Grid>
            <Grid item xs={12} style={{ paddingRight: 20, paddingLeft: 20 }}>
              <TextField
                fullWidth
                value={formValue.name}
                onChange={handleChangeForm("token")}
                label="Token"
              />
            </Grid>
            <Grid item xs={12} style={{ paddingRight: 20, paddingLeft: 20 }}>
              <TextField
                fullWidth
                value={formValue.name}
                onChange={handleChangeForm("newPassword")}
                label="New Password"
              />
            </Grid>
          </Grid>
        </div>
        <ModalFooter>
          <ButtonEnhance onClick={handleSubmit}>Submit</ButtonEnhance>
        </ModalFooter>
      </DialogContent>
    </ModalPage>
  );
};

export default ModalResetPassword;
