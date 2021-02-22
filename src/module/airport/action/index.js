import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api }) => {
    let { result, status } = await Api.get(`airport`);
    if (status === 200) {
      airportDispatcher.getDataSuccess(result);
    }
  },
  getDataByID: (id, callback) => async ({ Api }) => {
    let { result, status } = await Api.get(`airport/${id}`);
    if (status === 200) {
      callback && callback(result);
    }
  },
  createData: (data) => async ({ Api, toastr }) => {
    let { status } = await Api.post(`airport/create-airport`, data);
    if (status === 200) {
      toastr.success("Success");
    }
  },
  updateData: (data, callback) => async ({ Api, toastr }) => {
    let { status, result } = await Api.post(`airport/update-airport`, data);
    if (status === 200) {
      toastr.success("Success");
      callback && callback(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const airportDispatcher = synthesize("airport", mapDispatchToAC);
export default airportDispatcher;
