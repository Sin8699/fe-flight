import airportDispatcher from "../action";

const initialState = {
  list: [],
};

const airportReducer = airportDispatcher(initialState, {
  [airportDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data.list,
  }),
  [airportDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default airportReducer;
