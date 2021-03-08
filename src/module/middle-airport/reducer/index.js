import midAirportDispatcher from "../action";

const initialState = {
  list: [],
};

const midAirportReducer = midAirportDispatcher(initialState, {
  [midAirportDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data.listMiddleAirport,
  }),
  [midAirportDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default midAirportReducer;
