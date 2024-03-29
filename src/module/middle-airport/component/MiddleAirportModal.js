import React, { useState, useEffect } from "react";
import { DialogContent, TextField, Grid, MenuItem } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import validateData from "@/helpers/validationSchema";

const MiddleAirportModal = ({
  onClose,
  selectedItem,
  flightList,
  typeModal,
  onSubmit,
}) => {
  const [formValue, setFormValue] = useState({});
  console.log("formValue: ", formValue);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeModal === TYPE_MODAL.Edit) setFormValue(selectedItem);
  }, [typeModal, selectedItem]);

  const handleSubmit = async () => {
    try {
      await validateData("middleAirportSchema", formValue, (data) =>
        onSubmit(data)
      );
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
          {typeModal === TYPE_MODAL.Edit && selectedItem.airportCode}
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
                error={errors.flightCode}
                helperText={errors.flightCode}
                label="Flight"
                value={formValue.flightCode || ""}
                onChange={handleChangeForm("flightCode")}
                select
              >
                {flightList.map((flight) => (
                  <MenuItem key={flight.id} value={flight.id}>
                    {flight.id}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.timeDelay}
                helperText={errors.timeDelay}
                label="Time Delay"
                value={formValue.timeDelay}
                onChange={handleChangeForm("timeDelay")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                error={errors.order}
                helperText={errors.order}
                label="Order"
                value={formValue.order}
                onChange={handleChangeForm("order")}
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

export default MiddleAirportModal;
