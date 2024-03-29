import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: () => async ({ Api }) => {
    let { result, status } = await Api.get(`history-sale`);
    if (status === 200) {
      saleDispatcher.getDataSuccess(result);
    }
  },
  getTimeDataSuccess: (data) => ({
    data,
  }),
  getDataByTime: ({ year, month }) => async ({ Api }) => {
    let { result, status } = await Api.get(`history-sale/${year}/${month}`);
    if (status === 200) {
      saleDispatcher.getTimeDataSuccess(result);
    }
  },
  createData: (data, callback) => async ({ Api, toastr }) => {
    let { status } = await Api.post(`history-sale/create-sale`, data);
    if (status === 200) {
      toastr.success("Success");
      callback && callback();
    }
  },
  cancelTicket: (id, callback) => async ({ Api, toastr }) => {
    let { status } = await Api.post(`history-sale/cancel-ticket/${id}`);
    if (status === 200) {
      toastr.success("Cancel success");
      callback && callback();
    }
  },
  getSaleByStatus: (dataStatus, callback) => async ({ Api, toastr }) => {
    let { status, result } = await Api.post(
      `history-sale/get-sale-by-status/${dataStatus}`
    );
    if (status === 200) {
      toastr.success("Success");
      callback && callback(result);
    }
  },
  setState: (state, value) => ({ state, value }),
};

const saleDispatcher = synthesize("historySale", mapDispatchToAC);
export default saleDispatcher;
