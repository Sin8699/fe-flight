import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { dispatcherMiddleware } from "redux-dispatcher";
import rootReducer from "./reducer";
import fetchHelper from "@/helpers/FetchHelper";
import Api from "@/helpers/Api";
import toastr from "toastr";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  let middlewares = [
    dispatcherMiddleware.withContext({
      Api,
      fetchHelper,
      toastr,
    }),
  ];
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  let persistor = persistStore(store);
  return { store, persistor };
}
