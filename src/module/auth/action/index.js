import { synthesize } from "redux-dispatcher";
import toastr from "toastr";
import fetchHelper from "../../../helpers/FetchHelper";
import { saveToStorage, removeFromStorage } from "../../../utils/storage";

const mapDispatchToAC = {
  loginSuccess: (result) => ({ result }),
  login: (data) => async ({ Api }) => {
    let { result, status } = await Api.post(`user/login`, data);
    if (status === 200) {
      saveToStorage("user", result);
      fetchHelper.addDefaultHeader("Authorization", `Bearer ${result.token}`);
      toastr.success("Login success");
      window.location.replace("/");
    }
  },
  getInforUser: (callback) => async ({ Api }) => {
    let { result, status } = await Api.get(`user`);
    if (status === 200) {
      console.log("result: ", result);
      callback && callback(result);
    }
  },
  logoutSuccess: () => ({}),
  //logout: (isTokenExpired = false) => async ({ Api }) => {
  logout: () => async ({ Api }) => {
    //!isTokenExpired && authDispatcher.deleteNotifyToken({ deviceId: "" });
    removeFromStorage("user");
    fetchHelper.addDefaultHeader("Authorization", ``);
    authDispatcher.logoutSuccess();
  },

  setState: (state, value) => ({ state, value }),
};

const authDispatcher = synthesize("auth", mapDispatchToAC);
export default authDispatcher;
