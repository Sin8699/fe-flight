import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api, getState }) => {
    let { result, status } = await Api.get(`Banners`);
    if (status === 200) {
      midAirportDispatcher.getDataSuccess(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const midAirportDispatcher = synthesize("middle-airport", mapDispatchToAC);
export default midAirportDispatcher;
