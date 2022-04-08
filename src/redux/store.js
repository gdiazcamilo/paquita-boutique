import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";

import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { logger } from "redux-logger";

import persistedReducer from "./rootReducer";
import { fetchCollectionsStart } from "../redux/catalog/catalog.sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const persistor = persistStore(store);

sagaMiddleware.run(fetchCollectionsStart);

export { store, persistor };
