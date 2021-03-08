import React, { useState, useEffect } from "react";
import { DialogContent, TextField, Grid } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import validateData from "@/helpers/validationSchema";

const AirportModal = ({ onClose, selectedItem, typeModal, onSubmit }) => {
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeModal === TYPE_MODAL.Edit) setFormValue(selectedItem);
  }, [typeModal, selectedItem]);

  const handleSubmit = async () => {
    try {
      await validateData("airportSchema", formValue, (data) => onSubmit(data));
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
          {typeModal === TYPE_MODAL.Create && "New Airport"}
          {typeModal === TYPE_MODAL.Edit && selectedItem.name}
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
                error={errors.name}
                helperText={errors.name}
                label="Name"
                value={formValue.name}
                onChange={handleChangeForm("name")}
                disabled={typeModal === TYPE_MODAL.View}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.address}
                helperText={errors.address}
                label="Address"
                value={formValue.address}
                onChange={handleChangeForm("address")}
                disabled={typeModal === TYPE_MODAL.View}
              />
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

export default AirportModal;
