import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: () => async ({ Api }) => {
    let { result, status } = await Api.get(`flight`);
    if (status === 200) {
      flightDispatcher.getDataSuccess(result);
    }
  },
  getDataByID: (id, callback) => async ({ Api }) => {
    let { result, status } = await Api.get(`flight/${id}`);
    if (status === 200) {
      callback && callback(result);
    }
  },
  createData: (data, callback) => async ({ Api, toastr }) => {
    let { status } = await Api.post(`flight/create-flight`, data);
    if (status === 200) {
      toastr.success("Success");
      callback && callback();
    }
  },
  updateData: ({ data, id }, callback) => async ({ Api, toastr }) => {
    let { status, result } = await Api.post(`flight/update-flight`, data);
    if (status === 200) {
      toastr.success("Success");
      callback && callback(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const flightDispatcher = synthesize("flight", mapDispatchToAC);
export default flightDispatcher;
