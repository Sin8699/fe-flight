import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api, getState }) => {
    console.log('Api: ', Api);
    let { result, status } = await Api.get(`flight`);
    if (status === 200) {
      flightDispatcher.getDataSuccess(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const flightDispatcher = synthesize("flight", mapDispatchToAC);
export default flightDispatcher;
