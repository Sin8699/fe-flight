import React from "react";
import "./index.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import {
  Header,
  Homepage,
  Login,
  Signup,
  TableHistoryTicket,
} from "./components";
import FlightManagement from "@/module/flight/component";
// import Airport from "@/module/airport/component";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const AdminRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          restricted ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
function App() {
  return (
    <div>
      {/* <Header />
      <Login /> */}
      {/* <Homepage /> */}
      <FlightManagement />
    </div>
  );
}

export default App;
