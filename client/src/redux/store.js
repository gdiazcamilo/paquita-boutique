import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";

import rootReducer from "./rootReducer";
import rootSagas from "./root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export { store, persistor };
