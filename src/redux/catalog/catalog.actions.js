import CartTypes from "./catalog.types";

import { collection, getDocs } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapshotToObject,
} from "../../firebase/firebase.utils";

export const loadCollectionsStart = () => ({
  type: CartTypes.LOAD_COLLECTIONS_START,
});
export const loadCollectionsSuccess = (collections) => ({
  type: CartTypes.LOAD_COLLECTIONS_SUCCESS,
  payload: collections,
});
export const loadCollectionsFail = (errorMessage) => ({
  type: CartTypes.LOAD_COLLECTIONS_FAIL,
  payload: errorMessage,
});

export const loadCollections = () => {
  return async (dispatch) => {
    dispatch(loadCollectionsStart());

    const collectionRef = collection(firestore, "collections");

    try {
      const collectionSnapshot = await getDocs(collectionRef);
      const collections =
        convertCollectionsSnapshotToObject(collectionSnapshot);
      dispatch(loadCollectionsSuccess(collections));
    } catch (error) {
      dispatch(loadCollectionsFail(error.message));
    }
  };
};
