import React, { useState } from "react";
import { TextField, Grid, ClickAwayListener } from "@material-ui/core";
import { TimePicker } from "@material-ui/pickers";
import { get } from "lodash";
import styled from "styled-components";

const ControlTimePicker = ({
  label,
  onChange,
  value,
  error,
  grid,
  variant,
  ampm = true,
  views,
  disabled,
  minutesStep = 1,
  gridWrapper = true,
  clickAwayListener = true,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const renderChildren = () => {
    const children = (
      <TimePicker
        disabled={disabled}
        label={label}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        ampm={ampm}
        views={views || ["hours", "minutes"]}
        value={value}
        onChange={onChange}
        minutesStep={minutesStep}
        renderInput={(props) => (
          <FieldWrapper
            variant={variant || "standard"}
            {...props}
            fullWidth
            error={!!error}
            helperText={!variant && error}
            value={get(props, "inputProps.value", "")}
            inputProps={{ readOnly: true }}
          />
        )}
        {...props}
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

export default ControlTimePicker;

const FieldWrapper = styled(TextField)`
  .Mui-error {
    border: ${(props) =>
      props.variant === "outlined" ? "1px solid red" : "0"};
  }
  width: 100%;
`;
