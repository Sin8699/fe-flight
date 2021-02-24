import React, { useEffect } from "react";
import "./index.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ROLE_PERMISSION, urlLabel } from "@/constants/permission";
import { loadFromStorage } from "@/utils/storage";
import fetchHelper from "@/helpers/FetchHelper";
import {
  Header,
  Homepage,
  Login,
  Signup,
  TableHistoryTicket,
} from "./components";
import FlightManagement from "@/module/flight/component";
import AirportManagement from "@/module/airport/component";
import MiddleAirport from "@/module/middle-airport/component";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = loadFromStorage("auth") || {};

  useEffect(() => {
    if (accessToken) {
      fetchHelper.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = loadFromStorage("auth") || {};
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const AdminRoute = ({ component: Component, restricted, ...rest }) => {
  const { accessToken, role } = loadFromStorage("auth") || {};

  useEffect(() => {
    if (accessToken) {
      fetchHelper.addDefaultHeader("Authorization", `Bearer ${accessToken}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? (
          role === ROLE_PERMISSION.Admin ? (
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
      <BrowserRouter>
        <Header />
        <Switch>
          <PublicRoute
            path={`/${urlLabel.login}`}
            exact
            name="Login"
            component={Login}
          />
          <PublicRoute
            path={`/${urlLabel.signUp}`}
            exact
            name="Register"
            component={Signup}
          />
          <PrivateRoute path="/" exact component={Homepage} />
          <AdminRoute
            path={`/${urlLabel.flightManagement}`}
            exact
            component={FlightManagement}
          />
          <AdminRoute
            path={`/${urlLabel.airportManagement}`}
            exact
            component={AirportManagement}
          />
          <AdminRoute
            path={`/${urlLabel.middleAirport}`}
            exact
            component={MiddleAirport}
          />
          <Route path="*">
            <div className="page-404">
              <img src="/images/frame.png" alt="" />
              <h3>Page Not Found</h3>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
