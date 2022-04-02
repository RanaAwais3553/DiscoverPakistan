import { combineReducers } from "redux";
import rootSaga from "../sagas";
import configureStore from "./createStore";

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  user: require("./userRedux").reducer,
  main: require("./mainRedux").reducer,
  shop: require("./shopRedux").reducer,
});

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(
    reducers,
    rootSaga,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require("./").reducers;
      store.replaceReducer(nextRootReducer);
      const newYieldedSagas = require("../sagas").default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware(newYieldedSagas);
      });
    });
  }

  return store;
};
