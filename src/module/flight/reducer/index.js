import flightDispatcher from "../action";

const initialState = {
  list: [],
};

const flightReducer = flightDispatcher(initialState, {
  [flightDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data,
  }),
  [flightDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default flightReducer;
