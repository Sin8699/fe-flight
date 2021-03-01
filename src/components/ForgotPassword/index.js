import React, { useState } from "react";
import "./style.scss";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Dialog,
} from "@material-ui/core";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import ModalResetPassword from "./ModalResetPassword";
import DeleteModal from "@/components/DeleteModal";
import authDispatcher from "../../module/auth/action";

function ForgotPassword() {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
    };
    authDispatcher.forgotPassword(data, (result) => {
      if (result?.message === "Check your email to reset password") {
        setShowModal(true);
      }
    });
  };
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
      <Dialog
        disableEnforceFocus
        maxWidth="lg"
        fullWidth
        open={showModal}
        onClose={onCloseModal}
      >
        <ModalResetPassword onClose={onCloseModal} />
      </Dialog>
      {deleteModal && (
        <DeleteModal
          showModal={deleteModal}
          onClose={() => setDeleteModal(false)}
          modalName="Reset Password"
        />
      )}
    </div>
  );
}

export default ForgotPassword;
