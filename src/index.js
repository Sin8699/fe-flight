import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "toastr/toastr.scss";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import configureStore from "./redux/store";
import { theme } from "./theme";

const configure = configureStore();

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={configure.store}>
      <PersistGate loading={null} persistor={configure.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </MuiThemeProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
