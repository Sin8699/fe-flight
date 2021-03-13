import React, { useState, useEffect } from "react";
import { DialogContent, TextField, Grid, MenuItem } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import validateData from "@/helpers/validationSchema";

const UserModal = ({ onClose, selectedItem, typeModal, onSubmit }) => {
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeModal === TYPE_MODAL.Edit) setFormValue(selectedItem);
  }, [typeModal, selectedItem]);

  const handleSubmit = async () => {
    try {
      await validateData("userSchema", formValue, (data) => onSubmit(data));
    } catch (errs) {
      setErrors(errs);
    }
  };

  const handleChangeForm = (key) => (e) => {
    setFormValue({ ...formValue, [key]: e.target.value });
  };

  return (
    <ModalPage>
      <DialogContent>
        <div className="modal-header">
          {typeModal === TYPE_MODAL.Create && "New User"}
          {typeModal === TYPE_MODAL.Edit && selectedItem.fullName}
          <ClearRounded
            style={{ cursor: "pointer", float: "right", color: "#CACFD3" }}
            onClick={onClose}
          />
        </div>
        <div className="modal-body">
          <Grid container spacing={2} style={{ marginTop: 10 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.fullName}
                helperText={errors.fullName}
                label="Full Name"
                value={formValue.fullName}
                onChange={handleChangeForm("fullName")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                disabled
                label="Email"
                value={formValue.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.numberPhone}
                helperText={errors.numberPhone}
                label="Phone Number"
                value={formValue.numberPhone}
                onChange={handleChangeForm("numberPhone")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.accountBalance}
                helperText={errors.accountBalance}
                label="Account Balance"
                value={formValue.accountBalance}
                onChange={handleChangeForm("accountBalance")}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.role}
                helperText={errors.role}
                label="Role"
                value={formValue.role || ""}
                onChange={handleChangeForm("role")}
                select
              >
                {["ADMIN", "GUEST"].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </div>
        <ModalFooter>
          <ButtonEnhance
            background="#E9E9E9"
            color="black"
            backgroundHover="#ccc"
            onClick={onClose}
          >
            Cancel
          </ButtonEnhance>
          <ButtonEnhance onClick={handleSubmit}>
            {typeModal === TYPE_MODAL.Edit ? "Update" : "Create"}
          </ButtonEnhance>
        </ModalFooter>
      </DialogContent>
    </ModalPage>
  );
};

export default UserModal;
