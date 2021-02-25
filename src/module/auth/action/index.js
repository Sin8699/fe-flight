import { synthesize } from "redux-dispatcher";
import fetchHelper from "@/helpers/FetchHelper";
import { saveToStorage, removeFromStorage } from "@/utils/storage";

const mapDispatchToAC = {
  loginSuccess: (result) => ({ result }),
  login: (data, callback) => async ({ Api }) => {
    let { result, status } = await Api.post(`user/login`, data);
    if (status === 200) {
      const user = {
        accessToken: result.token,
        email: result.email,
      };
      saveToStorage("user", user);
      fetchHelper.addDefaultHeader("Authorization", `Bearer ${result.token}`);
      authDispatcher.loginSuccess(user);
      callback && callback();
    }
  },
  getInforUser: (callback) => async ({ Api }) => {
    let { result, status } = await Api.get(`user`);
    if (status === 200) {
      authDispatcher.getInfoSuccess(result);
      callback && callback(result);
    }
  },
  getInfoSuccess: (user) => ({ user }),
  logoutSuccess: () => ({}),
  logout: () => async ({ Api }) => {
    removeFromStorage("user");
    fetchHelper.addDefaultHeader("Authorization", ``);
    authDispatcher.logoutSuccess();
  },

  setState: (state, value) => ({ state, value }),
};

const authDispatcher = synthesize("auth", mapDispatchToAC);
export default authDispatcher;
