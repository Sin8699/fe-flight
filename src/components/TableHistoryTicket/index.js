import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const SAMPLE_DATA = [
  {
    id: "1",
    userID: "1",
    flightCode: "2",
    typeSeat: "VIP",
    numberSeat: "2",
    status: "true",
  },
  {
    id: "2",
    userID: "1",
    flightCode: "2",
    typeSeat: "NORMAL",
    numberSeat: "1",
    status: "false",
  },
];

function TableHistoryTicket() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Flight Code</TableCell>
            <TableCell align="center">Type Seat</TableCell>
            <TableCell align="center">Number Seat</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {SAMPLE_DATA.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.flightCode}</TableCell>
              <TableCell align="center">{row.typeSeat}</TableCell>
              <TableCell align="center">{row.numberSeat}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableHistoryTicket;
