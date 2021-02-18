import flightDispatcher from "../action";

const initialState = {
  list: [{ name: "AA A A", date: "03/18/2021" }],
};

const flightReducer = flightDispatcher(initialState, {
  [flightDispatcher.getDataSuccess]: (state, payload) => ({
    // list: payload.data.list,
  }),
  [flightDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default flightReducer;
