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
  register: (data, callback) => async ({ Api }) => {
    let { result, status } = await Api.post(`user/register`, data);
    if (status === 200) {
      callback && callback(result);
    }
  },
  getInforUser: (callback) => async ({ Api }) => {
    let { result, status } = await Api.get(`user`);
    if (status === 200) {
      authDispatcher.getInfoSuccess(result);
      callback && callback(result);
    }
  },
  forgotPassword: (email, callback) => async ({ Api }) => {
    let { result, status } = await Api.post(`user/forgot-password`, email);
    if (status === 200) {
      callback && callback(result);
    }
  },
  resetPassword: (token, newPass, callback) => async ({ Api }) => {
    let { result, status } = await Api.post(
      `user/reset-password/${token}`,
      newPass
    );
    if (status === 200) {
      callback && callback();
    }
  },
  changePassword: (data, callback) => async ({ Api }) => {
    let { result, status } = await Api.post(`user/change-password`, data);
    if (status === 200) {
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
  getDataSuccess: (data) => ({
    data,
  }),
  getAllData: () => async ({ Api }) => {
    let { result, status } = await Api.get(`user`);
    if (status === 200) {
      authDispatcher.getDataSuccess(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const authDispatcher = synthesize("auth", mapDispatchToAC);
export default authDispatcher;
