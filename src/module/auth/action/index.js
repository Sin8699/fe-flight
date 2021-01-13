import { synthesize } from "redux-dispatcher";
import toastr from "toastr";
import fetchHelper from "../../../helpers/FetchHelper";

const mapDispatchToAC = {
  loginSuccess: (result, email) => ({ result, email }),
  logoutSuccess: () => ({}),
  logout: (isTokenExpired = false) => async ({ Api }) => {
    !isTokenExpired && authDispatcher.deleteNotifyToken({ deviceId: "" });
    localStorage.removeItem("persist:root");
    fetchHelper.addDefaultHeader("Authorization", ``);
    authDispatcher.logoutSuccess();
  },

  setState: (state, value) => ({ state, value }),
};

const authDispatcher = synthesize("auth", mapDispatchToAC);
export default authDispatcher;
