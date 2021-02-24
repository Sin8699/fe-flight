import authDispatcher from "../action";

const initialState = {
  accessToken: "",
  expireIn: 0,
  expireOn: "",
  refreshToken: "",
  tokenType: "Bearer",
  role: "",
};

const authReducer = authDispatcher(initialState, {
  [authDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
  [authDispatcher.loginSuccess]: (state, payload) => ({
    ...payload.result,
  }),
});

export default authReducer;
