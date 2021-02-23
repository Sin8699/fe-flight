import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api }) => {
    let { result, status } = await Api.get(`middle-airport`);
    if (status === 200) {
      midAirportDispatcher.getDataSuccess(result);
    }
  },
  getDataByID: (id, callback) => async ({ Api }) => {
    let { result, status } = await Api.get(
      `middle-airport/middle-airport-by-flight-code/${id}`
    );
    if (status === 200) {
      callback && callback(result);
    }
  },
  createData: (data, callback) => async ({ Api, toastr }) => {
    let { status } = await Api.post(`airport/create-middle-airport`, data);
    if (status === 200) {
      toastr.success("Success");
      callback && callback();
    }
  },
  updateData: (data, callback) => async ({ Api, toastr }) => {
    let { status, result } = await Api.post(
      `airport/update-middle-airport`,
      data
    );
    if (status === 200) {
      toastr.success("Success");
      callback && callback(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const midAirportDispatcher = synthesize("middleAirport", mapDispatchToAC);
export default midAirportDispatcher;
