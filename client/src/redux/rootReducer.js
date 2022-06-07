import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import catalogReducer from "./catalog/catalog.reducer";

const persistReducerConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  catalog: catalogReducer,
});
// const persistedReducer = persistReducer(persistReducerConfig, rootReducer);
export default rootReducer;
