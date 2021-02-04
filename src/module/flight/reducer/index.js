import flightDispatcher from "../action/banner";

const initialState = {
  list: [],
};

const flightReducer = flightDispatcher(initialState, {
  [flightDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data.list,
  }),
  [flightDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default flightReducer;
