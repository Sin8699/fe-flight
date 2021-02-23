import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#442b67",
    },
    secondary: {
      main: "#8F9BA9",
    },
  },
  typography: {
    useNextVariants: true,
    fontSize: 14,
    fontFamily: "Source Sans Pro",
    body1: {
      fontSize: 14,
    },
  },
  overrides: {
    MuiDrawer: {
      paper: {
        width: "300px",
      },
    },
    MuiInputBase: {
      input: {
        marginLeft: 12,
        paddingBottom: 9,
        paddingTop: 9,
      },
    },
    MuiInput: {
      underline: {
        "&:after": {
          borderBottom: "1px solid #AD5E99",
        },
        "&:hover:not(.Mui-disabled):before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.87)",
        },
      },
    },
    MuiFilledInput: {
      input: {
        marginLeft: 0,
      },
    },
    MuiInputLabel: {
      filled: {
        top: 0,
        left: -10,
        position: "absolute",
      },
      formControl: {
        top: 0,
        left: 12,
        position: "absolute",
        transform: "translate(0, 24px) scale(1)",
      },
      shrink: {
        transform: "translate(0, 1.5px) scale(0.75)",
        transformOrigin: "top left",
        left: 0,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 10,
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: 600,
        verticalAlign: "bottom",
      },
      body: {
        color: "rgba(0, 0, 0, 0.87)",
        verticalAlign: "top",
      },
      stickyHeader: {
        top: 0,
        left: 0,
        zIndex: 2,
        position: "sticky",
        backgroundColor: "#ffffff",
      },
    },
    MuiSelect: {
      select: {
        background: "none !important",
      },
    },
    MuiMenuItem: {
      root: {
        minWidth: 190,
      },
    },
  },
});
