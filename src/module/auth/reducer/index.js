import authDispatcher from "../action";

const initialState = {
  accessToken: "",
  expireIn: 0,
  expireOn: "",
  refreshToken: "",
  tokenType: "Bearer",
  userInfo: {},
  list: [],
};

const authReducer = authDispatcher(initialState, {
  [authDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
  [authDispatcher.loginSuccess]: (state, payload) => ({
    ...payload.result,
  }),
  [authDispatcher.logoutSuccess]: (state, payload) => ({
    accessToken: "",
    userInfo: {},
  }),
  [authDispatcher.getInfoSuccess]: (state, payload) => ({
    userInfo: payload.user,
  }),
  [authDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data,
  }),
});

export default authReducer;
