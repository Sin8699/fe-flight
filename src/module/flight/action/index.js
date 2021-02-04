import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api, getState }) => {
    let { result, status } = await Api.get(`Banners`);
    if (status === 200) {
      flightDispatcher.getDataSuccess(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const flightDispatcher = synthesize("flight", mapDispatchToAC);
export default flightDispatcher;
