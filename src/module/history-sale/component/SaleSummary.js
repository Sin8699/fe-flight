import React, { useState, useEffect } from "react";
import { PaperWrapped } from "@/componentsUI";
import {
  TableHead,
  TableRow,
  TableCell,
  TextField,
  MenuItem,
} from "@material-ui/core";
import TableContainer from "@/components/TableContainer";
import { summaryColumn, ENUM_YEAR, ENUM_MONTH } from "../constants";
import { useSelector } from "react-redux";
import saleDispatcher from "../action";
import moment from "moment";
import { SHOW_DATE_TIME } from "@/constants/dateTime";

const SaleManagement = () => {
  const { timeList } = useSelector((state) => state.historySale);

  const [filterVar, setFilterVar] = useState({ year: 2021, month: 1 });

  useEffect(() => {
    saleDispatcher.getDataByTime(filterVar);
  }, [filterVar]);

  const handleChangeFilter = (key) => (e) => {
    setFilterVar({ ...filterVar, [key]: e.target.value });
  };

  const TableHeader = () => (
    <TableHead>
      <TableRow>
        {summaryColumn.map((item) => (
          <TableCell key={item.stateValue}>{item.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const FilterButton = (
    <React.Fragment>
      <TextField
        label="Year"
        value={filterVar.year || ""}
        style={{ marginLeft: 10, width: 80 }}
        onChange={handleChangeFilter("year")}
        select
      >
        {ENUM_YEAR.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Month"
        value={filterVar.month || ""}
        style={{ marginLeft: 10, width: 50 }}
        onChange={handleChangeFilter("month")}
        select
      >
        {ENUM_MONTH.map((month) => (
          <MenuItem key={month} value={month}>
            {month}
          </MenuItem>
        ))}
      </TextField>
    </React.Fragment>
  );

  return (
    <PaperWrapped>
      <TableContainer
        title="Sale Summary"
        data={timeList}
        header={TableHeader}
        ToolbarComponent={FilterButton}
        searchKey="flightCode"
        renderRow={(row) => (
          <>
            <TableCell>{row.userID}</TableCell>
            <TableCell>{row.flightCode}</TableCell>
            <TableCell>{row.typeSeat}</TableCell>
            <TableCell>{row.seatNumber}</TableCell>
          </>
        )}
      />
    </PaperWrapped>
  );
};

export default SaleManagement;
