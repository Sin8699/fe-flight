import { synthesize } from "redux-dispatcher";

const mapDispatchToAC = {
  getDataSuccess: (data) => ({
    data,
  }),
  getData: (search, paging) => async ({ Api }) => {
    let { result, status } = await Api.get(`history-sale`);
    console.log('result: ', result);
    if (status === 200) {
      saleDispatcher.getDataSuccess(result);
    }
  },
  createData: (data, callback) => async ({ Api, toastr }) => {
    let { status } = await Api.get(`history-sale/create-sale`, data);
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
