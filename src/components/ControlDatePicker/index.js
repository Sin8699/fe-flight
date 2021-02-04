import React, { useState } from "react";
import { TextField, Grid, ClickAwayListener } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";

const ControlDatepicker = ({
  label,
  onChange,
  value,
  error,
  grid,
  variant,
  disableFuture,
  disablePast,
  inputFormat,
  disabled,
  gridWrapper = true,
  clickAwayListener = true,
  minDate,
  maxDate,
}) => {
  const [open, setOpen] = useState(false);

  const renderChildren = () => {
    const children = (
      <DatePicker
        disabled={disabled}
        label={label}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        disablePast={disablePast}
        disableFuture={disableFuture}
        inputFormat={inputFormat || "DD/MM/YYYY"}
        minDate={minDate}
        maxDate={maxDate}
        renderInput={(props) => (
          <TextField
            className="date-picker-custom"
            variant={variant || "standard"}
            fullWidth
            {...props}
            helperText={error}
            error={!!error}
          />
        )}
        value={value}
        onChange={onChange}
        autoOk
      />
    );
    if (gridWrapper)
      return (
        <Grid item xs={grid || 6}>
          {children}
        </Grid>
      );
    return children;
  };

  if (!clickAwayListener) return renderChildren();

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      {renderChildren()}
    </ClickAwayListener>
  );
};

export default ControlDatepicker;
