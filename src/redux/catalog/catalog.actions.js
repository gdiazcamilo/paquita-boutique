import CartTypes from "./catalog.types";

import { collection, getDocs } from "firebase/firestore";
import {
  firestore,
  convertCollectionsSnapshotToObject,
} from "../../firebase/firebase.utils";

const loadCollectionsStart = () => ({
  type: CartTypes.LOAD_COLLECTIONS_START,
});
const loadCollectionsSuccess = (collections) => ({
  type: CartTypes.LOAD_COLLECTIONS_SUCCESS,
  payload: collections,
});
const loadCollectionsFail = (errorMessage) => ({
  type: CartTypes.LOAD_COLLECTIONS_FAIL,
  payload: errorMessage,
});

export const loadCollections = () => {
  return (dispatch) => {
    dispatch(loadCollectionsStart());

    const collectionRef = collection(firestore, "collections");

    getDocs(collectionRef)
      .then((snapshot) => {
        const collections = convertCollectionsSnapshotToObject(snapshot);
        dispatch(loadCollectionsSuccess(collections));
      })
      .catch((error) => dispatch(loadCollectionsFail(error.message)));
  };
};
