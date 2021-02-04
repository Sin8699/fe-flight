import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import FlightManagement from "@/module/flight/component";

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
    <div className="App">
      <FlightManagement />
    </div>
  );
}

export default App;
