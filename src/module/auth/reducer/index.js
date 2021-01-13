import authDispatcher from "../action";

const initialState = {
  accessToken: "",
  expireIn: 0,
  expireOn: "",
  refreshToken: "",
  tokenType: "Bearer",
  userInfo: {},
};

const authReducer = authDispatcher(initialState, {
  [authDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default authReducer;
