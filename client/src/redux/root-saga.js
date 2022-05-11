import { all, call } from "redux-saga/effects";

import { userSagas } from "./user/user.sagas";
import { catalogSagas } from "./catalog/catalog.sagas";
import { cartSagas } from "./cart/cart.sagas.js";

export default function* rootSagas() {
  yield all([call(userSagas), call(catalogSagas), call(cartSagas)]);
}
