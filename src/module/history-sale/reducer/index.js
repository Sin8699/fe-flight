import saleDispatcher from "../action";

const initialState = {
  list: [],
};

const saleReducer = saleDispatcher(initialState, {
  [saleDispatcher.getDataSuccess]: (state, payload) => ({
    list: payload.data.listSale,
  }),
  [saleDispatcher.setState]: (state, payload) => ({
    [payload.state]: payload.value,
  }),
});

export default saleReducer;
