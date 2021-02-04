import React, { useState, useEffect } from "react";
import { DialogContent, TextField, Grid, MenuItem } from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@material-ui/pickers";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import { FORMAT_DD_MM_YYYY } from "@/constants/dateTime";

const FlightModal = ({
  onClose,
  selectedItem,
  typeModal,
  onSubmit,
  airportList = [],
}) => {
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeModal === TYPE_MODAL.Edit) setFormValue(selectedItem);
  }, [typeModal, selectedItem]);

  const handleSubmit = async () => {
    try {
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
        <div className="header">
          {typeModal === TYPE_MODAL.Create && "New Flight"}
          {typeModal === TYPE_MODAL.Edit && selectedItem.name}
          <ClearRounded
            style={{ cursor: "pointer", float: "right", color: "#CACFD3" }}
            onClick={onClose}
          />
        </div>
        <div className="body">
          <LocalizationProvider dateAdapter={MomentAdapter}>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <TextField
                  error={errors.airportFrom}
                  helperText={errors.airportFrom}
                  label="From"
                  value={formValue.airportFrom}
                  onChange={handleChangeForm("airportFrom")}
                  select
                  fullWidth
                >
                  {airportList.map((airport) => (
                    <MenuItem
                      key={airport.airportCode}
                      value={airport.airportCode}
                    >
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  error={errors.airportTo}
                  helperText={errors.airportTo}
                  label="To"
                  value={formValue.airportTo}
                  onChange={handleChangeForm("airportTo")}
                  select
                  fullWidth
                >
                  {airportList.map((airport) => (
                    <MenuItem
                      key={airport.airportCode}
                      value={airport.airportCode}
                    >
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  value={formValue.dateStar}
                  onChange={handleChangeForm("dateStar")}
                  disablePast
                  inputFormat={FORMAT_DD_MM_YYYY}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      label="Start date"
                      style={{ width: "100%", marginTop: 10 }}
                      error={errors.dateStar}
                      helperText={errors.dateStar}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TimePicker
                  clearable
                  label="Start Time"
                  value={formValue.timeStar}
                  onChange={handleChangeForm("timeStar")}
                  views={["hours", "minutes"]}
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      style={{ width: "100%", marginTop: 10 }}
                      error={errors.timeStar}
                      helperText={errors.timeStar}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={errors.vipSeats}
                  helperText={errors.vipSeats}
                  label="Vip Seat"
                  value={formValue.vipSeats}
                  onChange={handleChangeForm("vipSeats")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={errors.vipPrice}
                  helperText={errors.vipPrice}
                  label="Vip Price"
                  value={formValue.vipPrice}
                  onChange={handleChangeForm("vipPrice")}
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
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  error={errors.normalPrice}
                  helperText={errors.normalPrice}
                  label="Normal Price"
                  value={formValue.normalPrice}
                  onChange={handleChangeForm("normalPrice")}
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

export default FlightModal;
