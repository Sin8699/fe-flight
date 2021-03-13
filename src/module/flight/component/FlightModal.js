import React, { useState, useEffect } from "react";
import {
  DialogContent,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { ClearRounded } from "@material-ui/icons";
import { TYPE_MODAL } from "@/constants/modal";
import { ButtonEnhance, ModalFooter, ModalPage } from "@/componentsUI";
import { LocalizationProvider, DateTimePicker } from "@material-ui/pickers";
import MomentAdapter from "@material-ui/pickers/adapter/moment";
import moment from "moment";
import validateData from "@/helpers/validationSchema";
import { TICKET_STATUS } from "../constants";

const FlightModal = ({
  onClose,
  selectedItem,
  typeModal,
  onSubmit,
  airportList = [],
}) => {
  const [formValue, setFormValue] = useState({ dateStart: "", dateEnd: "" });
  console.log("selectedItem: ", selectedItem);
  console.log("formValue: ", formValue);
  const [bookTicket, setBookTicket] = useState({
    status: TICKET_STATUS.Book,
    normalSeats: 0,
    vipSeats: 0,
  });
  const [errors, setErrors] = useState({});

  //View or Book ticket mode
  const disabledAdminField =
    typeModal === TYPE_MODAL.View || typeModal === TYPE_MODAL.BookTicket;

  useEffect(() => {
    if (typeModal !== TYPE_MODAL.Create) setFormValue(selectedItem);
  }, [typeModal, selectedItem]);

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

  const handleSubmitTicket = async () => {
    try {
      await validateData("bookTicketSchema", bookTicket, (data) => {
        const status = data.status === TICKET_STATUS.Buy;
        onSubmit({ ...data, flightCode: selectedItem.id, status });
      });
    } catch (errs) {
      setErrors(errs);
    }
  };

  const handleBookTicket = (key) => (e) => {
    setBookTicket({ ...bookTicket, [key]: e.target.value });
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
          {typeModal === TYPE_MODAL.Create && "New Flight"}
          {typeModal === TYPE_MODAL.View && "Flight Detail"}
          {typeModal === TYPE_MODAL.BookTicket && "Booking Ticket"}
          {typeModal === TYPE_MODAL.Edit && "Update Flight"}
          <ClearRounded
            style={{ cursor: "pointer", float: "right", color: "#CACFD3" }}
            onClick={onClose}
          />
        </div>
        <div className="modal-body">
          <LocalizationProvider dateAdapter={MomentAdapter}>
            <Grid container spacing={2} style={{ marginTop: 10 }}>
              <Grid item xs={6}>
                <TextField
                  error={errors.airportFrom}
                  helperText={errors.airportFrom}
                  label="From"
                  value={formValue.airportFrom || ""}
                  onChange={handleChangeForm("airportFrom")}
                  select
                  fullWidth
                  disabled={disabledAdminField}
                >
                  {airportList.map((airport) => (
                    <MenuItem key={airport.id} value={airport.id}>
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
                  value={formValue.airportTo || ""}
                  onChange={handleChangeForm("airportTo")}
                  select
                  fullWidth
                  disabled={disabledAdminField}
                >
                  {airportList.map((airport) => (
                    <MenuItem key={airport.id} value={airport.id}>
                      {airport.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  disabled={disabledAdminField}
                  label="Start Date"
                  minDate={new Date()}
                  renderInput={(props) => (
                    <TextField
                      className="date-picker-custom"
                      variant={"standard"}
                      {...props}
                      error={errors.dateEnd}
                      fullWidth
                      helperText={errors.dateStart}
                    />
                  )}
                  value={formValue.dateStart}
                  onChange={handleChangeForm("dateStart")}
                  ampm={false}
                  autoOk
                />
              </Grid>
              <Grid item xs={6}>
                <DateTimePicker
                  disabled={disabledAdminField}
                  label="End Date"
                  minDate={new Date()}
                  renderInput={(props) => (
                    <TextField
                      className="date-picker-custom"
                      variant={"standard"}
                      {...props}
                      error={errors.dateEnd}
                      fullWidth
                      helperText={errors.dateEnd}
                    />
                  )}
                  value={formValue.dateEnd}
                  onChange={handleChangeForm("dateEnd")}
                  ampm={false}
                  autoOk
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={disabledAdminField}
                  fullWidth
                  error={errors.vipSeats}
                  helperText={errors.vipSeats}
                  label="Vip Seat"
                  value={formValue.vipSeats}
                  onChange={handleChangeForm("vipSeats")}
                  type="number"
                  inputProps={{ min: "0" }}
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
                  type="number"
                  inputProps={{ min: "0" }}
                  disabled={disabledAdminField}
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
                  disabled={disabledAdminField}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  disabled={disabledAdminField}
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
              {typeModal === TYPE_MODAL.BookTicket && (
                <React.Fragment>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      disabled
                      label={`Available vip seat: ${selectedItem.availableVipSeat}`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      disabled
                      label={`Available normal seat: ${selectedItem.availableNormalSeat}`}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      error={errors.normalSeats}
                      helperText={errors.normalSeats}
                      label="Normal Seat:"
                      value={bookTicket.normalSeats}
                      onChange={handleBookTicket("normalSeats")}
                      type="number"
                      inputProps={{ min: "0" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Vip Seat:"
                      value={bookTicket.vipSeats}
                      onChange={handleBookTicket("vipSeats")}
                      type="number"
                      inputProps={{ min: "0" }}
                    />
                  </Grid>
                  <RadioGroup
                    value={bookTicket.status}
                    onChange={handleBookTicket("status")}
                    className="radio-group"
                  >
                    <Grid container>
                      <Grid item xs={6}>
                        <FormControlLabel
                          label="Book Ticket (50% price of ticket)"
                          value={TICKET_STATUS.Book}
                          control={<Radio />}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          label="Buy Ticket"
                          value={TICKET_STATUS.Buy}
                          control={<Radio />}
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </React.Fragment>
              )}
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
          {disabledAdminField ? (
            typeModal === TYPE_MODAL.BookTicket && (
              <ButtonEnhance onClick={handleSubmitTicket}>
                Book Ticket
              </ButtonEnhance>
            )
          ) : (
            <ButtonEnhance onClick={handleSubmit}>
              {typeModal === TYPE_MODAL.Edit ? "Update" : "Create"}
            </ButtonEnhance>
          )}
        </ModalFooter>
      </DialogContent>
    </ModalPage>
  );
};

export default FlightModal;
