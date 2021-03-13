import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer as MUTableContainer,
  TableBody,
  Typography,
  TableRow,
  Input,
} from "@material-ui/core";
import { filter, includes, chunk } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import { ToolsBar } from "./styled";
import { ButtonEnhance, PaperWrapped } from "@/componentsUI";
import TablePagination from "../TablePagination";

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
});

const TableContainer = ({
  title,
  onAddNew,
  txtBtnAddNew = "Create New",
  customButtons,
  noDataHelperText,
  ToolbarComponent,
  header: Header,
  renderRow,
  searchKey,
  data = [],
}) => {
  const classes = useStyles();

  const [localData, setLocalData] = useState(data);
  const [paging, setPaging] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalItem: localData.length || data.length,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPaging({ ...paging, totalItem: data.length });
  }, [data]);

  useEffect(() => {
    if (!!search) {
      const filteredData = filter(data, (item) =>
        includes(item[searchKey]?.toString(), search)
      );
      setLocalData(filteredData);
    } else setLocalData(data);
  }, [data, search, searchKey]);

  useEffect(() => {
    const { pageIndex, pageSize } = paging;
    const newData = chunk(data, pageSize)[pageIndex] || [];
    setLocalData(newData);
  }, [paging]);

  return (
    <PaperWrapped className={classes.paper}>
      <MUTableContainer>
        <div className="table-container-header">
          <Typography className="title">{title}</Typography>
          <div className="btn-group">
            {onAddNew && (
              <ButtonEnhance onClick={onAddNew}>{txtBtnAddNew}</ButtonEnhance>
            )}
            {customButtons}
          </div>
        </div>
        <ToolsBar>
          <div
            style={{
              display: "flex",
              marginBottom: 10,
              alignItems: "flex-end",
            }}
          >
            <div className="search-container">
              <Input
                allowClear
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                fullWidth
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
              {localData.map((d, i) => (
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
      <TablePagination paging={paging} onChange={setPaging} />
    </PaperWrapped>
  );
};

export default TableContainer;
