import React from "react";
import { PaperWrapped } from "@/componentsUI";
import { TableHead, TableRow, TableCell } from "@material-ui/core";
import TableContainer from "@/components/TableContainer";

const transactionHistoryColumn = [
  {
    label: "ID",
    stateValue: "id",
  },
  {
    label: "UserID",
    stateValue: "userID",
  },
  
  {
    label: "Flight Code",
    stateValue: "flightCode",
  },
  {
    label: "TypeSeat",
    stateValue: "typeSeat",
  },
  {
    label: "NumberSeat",
    stateValue: "numberSeat",
  },
  {
    label: "Status",
    stateValue: "status",
  },
  {
    label: "Amount of money",
    stateValue: "amountMoney",
  },
];

const list = [
  {
    id: "1",
    userID: "1",
    flightCode: "1",
    typeSeat: "VIP",
    numberSeat: "1",
    status: "true",
    amountMoney: "1000",
  },
  {
    id: "2",
    userID: "2",
    flightCode: "2",
    typeSeat: "NORMAL",
    numberSeat: "2",
    status: "true",
    amountMoney: "1000",
  },
  {
    id: "3",
    userID: "3",
    flightCode: "3",
    typeSeat: "VIP",
    numberSeat: "3",
    status: "false",
    amountMoney: "1000",
  },
];

const TransactionHistory = () => {
  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {transactionHistoryColumn.map((item) => (
          <TableCell key={item.stateValue}>{item.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
  return (
    <PaperWrapped>
      <TableContainer
        title="Transaction History"
        data={list}
        header={TableHeader}
        renderRow={(row) => (
          <>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.userID}</TableCell>
            <TableCell>{row.flightCode}</TableCell>
            <TableCell>{row.typeSeat}</TableCell>
            <TableCell>{row.numberSeat}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.amountMoney}</TableCell>
          </>
        )}
      />
    </PaperWrapped>
  );
};
export default TransactionHistory;
