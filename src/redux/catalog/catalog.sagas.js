import { takeEvery, call, put } from "redux-saga/effects";
import { getDocs, collection } from "firebase/firestore";

import CatalogTypes from "./catalog.types";
import {
  loadCollectionsSuccess,
  loadCollectionsFail,
} from "../catalog/catalog.actions";
import {
  firestore,
  convertCollectionsSnapshotToObject,
} from "../../firebase/firebase.utils";

function* fetchCollections() {
  const collectionRef = collection(firestore, "collections");

  try {
    const collectionSnapshot = yield call(getDocs, collectionRef);
    const collections = yield call(
      convertCollectionsSnapshotToObject,
      collectionSnapshot
    );
    yield put(loadCollectionsSuccess(collections));
  } catch (error) {
    yield put(loadCollectionsFail(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeEvery(CatalogTypes.LOAD_COLLECTIONS_START, fetchCollections);
}
