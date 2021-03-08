import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  LastPage,
  FirstPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
} from "@material-ui/icons";
import { TablePagination, IconButton } from "@material-ui/core";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const TablePaging = ({ paging = {}, onChange }) => {
  const TablePaginationActions = (props) => {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage } = props;

    const handleFirstPageButtonClick = () => {
      onChange({
        ...paging,
        pageIndex: 0,
      });
    };

    const handleBackButtonClick = () => {
      onChange({
        ...paging,
        pageIndex: page - 1,
      });
    };

    const handleNextButtonClick = () => {
      onChange({
        ...paging,
        pageIndex: page + 1,
      });
    };

    const handleLastPageButtonClick = () => {
      onChange({
        ...paging,
        pageIndex: parseInt(paging.totalItem / paging.pageSize),
      });
    };

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
        </IconButton>
      </div>
    );
  };
  return (
    <TablePagination
      rowsPerPageOptions={[2, 5, 10, 50]}
      component="div"
      count={paging.totalItem || 0}
      rowsPerPage={paging.pageSize}
      page={paging.pageIndex}
      style={{ padding: "10px 0" }}
      backIconButtonProps={{
        "aria-label": "Previous Page",
      }}
      nextIconButtonProps={{
        "aria-label": "Next Page",
      }}
      onChangePage={(e, page) => {
        e &&
          onChange({
            ...paging,
            pageIndex: page,
          });
      }}
      onChangeRowsPerPage={(e) => {
        onChange({
          ...paging,
          pageSize: e.target.value,
          pageIndex: 0,
        });
      }}
      ActionsComponent={TablePaginationActions}
    />
  );
};
export default TablePaging;
