import React, { useState } from "react";
import { DialogContent, TextField, Grid, Typography } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import { LocalizationProvider, DateTimePicker } from "@material-ui/pickers";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import validateData from "@/helpers/validationSchema";
import { FORMAT_DATE_TIME } from "@/constants/dateTime";

const BookTicket = ({
  onClose,
  selectedItem,
  typeModal,
  onSubmit,
  airportList = [],
}) => {
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await validateData(
        "flightSchema",
        {
          ...formValue,
          dateStart: moment(formValue.dateStart).format(),
          dateEnd: moment(formValue.dateEnd).format(),
        },
        (data) => onSubmit(data)
      );
    } catch (errs) {
      setErrors(errs);
    }
  };

  const handleChangeForm = (key) => (e) => {
    let value;
    switch (key) {
      case "dateStart":
      case "dateEnd":
        value = e;
        break;
      default:
        value = e.target.value;
        break;
    }
    setFormValue({ ...formValue, [key]: value });
  };

  return (
    <ModalPage>
      <DialogContent>
        <div className="modal-header">
          {"Booking Ticket"}
          <ClearRounded
            style={{ cursor: "pointer", float: "right", color: "#CACFD3" }}
            onClick={onClose}
          />
        </div>
        <div className="modal-body">
          <LocalizationProvider dateAdapter={MomentAdapter}>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <Typography>{`From: ${selectedItem.airportFrom}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`To: ${selectedItem.airportTo}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`Start Date: ${moment(
                  selectedItem.dateStart
                ).format(FORMAT_DATE_TIME)}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`End Date: ${moment(selectedItem.dateEnd).format(
                  FORMAT_DATE_TIME
                )}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>{`To: ${selectedItem.airportTo}`}</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={errors.vipPrice}
                  helperText={errors.vipPrice}
                  label="Vip Price"
                  value={formValue.vipPrice}
                  onChange={handleChangeForm("vipPrice")}
                  type="number"
                  inputProps={{ min: "0" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={errors.normalSeats}
                  helperText={errors.normalSeats}
                  label="Normal Seat"
                  value={formValue.normalSeats}
                  onChange={handleChangeForm("normalSeats")}
                  type="number"
                  inputProps={{ min: "0" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={typeModal === TYPE_MODAL.View}
                  fullWidth
                  error={errors.normalPrice}
                  helperText={errors.normalPrice}
                  label="Normal Price"
                  value={formValue.normalPrice}
                  onChange={handleChangeForm("normalPrice")}
                  type="number"
                  inputProps={{ min: "0" }}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
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

export default BookTicket;
