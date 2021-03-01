import React from "react";
import "./index.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { ROLE_PERMISSION, urlLabel } from "@/constants/permission";
import { loadFromStorage } from "@/utils/storage";
import { Header, Homepage, Login, Signup, ForgotPassword } from "./components";
import FlightManagement from "@/module/flight/component";
import AirportManagement from "@/module/airport/component";
import MiddleAirport from "@/module/middle-airport/component";
import { TransactionHistory, ChangePassword } from "@/module/auth/component";

const NormalRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { accessToken } = loadFromStorage("user") || {};

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
  const { accessToken } = loadFromStorage("user") || {};
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
  const { accessToken, role } = loadFromStorage("user") || {};

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
          <PublicRoute
            path={`/${urlLabel.forgotPassword}`}
            exact
            name="ForgotPassword"
            component={ForgotPassword}
          />
          <NormalRoute path="/" exact name="Homepage" component={Homepage} />
          <PrivateRoute
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
