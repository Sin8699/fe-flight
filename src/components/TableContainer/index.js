import React, { useState } from "react";
import {
  Table,
  Paper,
  TableContainer as MUTableContainer,
  TableBody,
  TablePagination,
  Typography,
  TableRow,
  IconButton,
  Grid,
  Button,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { ToolsBar } from "./styled";

const useStyles = makeStyles({
  paper: {
    padding: "20px 40px",
  },
  contained: {
    boxShadow: "none",
  },
  head: {
    fontWeight: 600,
  },
  container: {
    // height: 'calc(100% - 400px)',
    height: "100%",
    width: "100%",
  },
  tableContainer: {
    width: "100%",
    maxHeight: "calc(100vh - 350px)",
    margin: 0,
    padding: 0,
    overflow: "auto",
  },
  divTxtTable: {
    padding: "16px 0 16px",
    borderBottom: "1px solid #e9e9e9",
  },
  descTxtTable: {
    fontSize: 14,
    textAlign: "center",
    color: "#8F9BA9",
    margin: 0,
  },
  btn: {
    margin: 5,
    paddingLeft: 40,
    paddingRight: 40,
    color: "primary",
  },
});

const TableContainer = ({
  title,
  onAddNew,
  txtBtnAddNew = "Create New",
  customButtons,
  noDataHelperText,
  ToolbarComponent,
  searchKey,
  setSearchKey,
  header: Header,
  renderRow,
  data,
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <MUTableContainer>
        <div className="table-container-header">
          <Typography
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <div style={{ display: "flex" }}>
            {onAddNew && (
              <Button className={classes.btn} onClick={onAddNew}>
                {txtBtnAddNew}
              </Button>
            )}
            {customButtons}
          </div>
        </div>
        <ToolsBar>
          <div style={{ display: "flex", marginBottom: 10 }}>
            <div className="search-container">
              <Input
                allowClear
                value={searchKey}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
                placeholder="Search..."
                prefix={
                  <Search
                    style={{ color: "rgba(0,0,0,.25)", fontSize: 16 }}
                    type="search"
                  />
                }
              />
            </div>
            {ToolbarComponent}
          </div>
        </ToolsBar>
        <div className={classes.tableContainer}>
          <Table stickyHeader>
            {Header && <Header />}
            <TableBody>
              {(data || []).map((d, i) => (
                <TableRow
                  key={d.id}
                  hover
                  classes={{
                    head: classes.head,
                  }}
                >
                  {renderRow(d, i)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </MUTableContainer>
      {noDataHelperText && data.length === 0 && (
        <div className={classes.divTxtTable}>
          <p className={classes.descTxtTable}>{noDataHelperText}</p>
        </div>
      )}
    </Paper>
  );
};

export default TableContainer;
