import CatalogTypes from "./catalog.types";

const INITIAL_STATE = {
  collections: {},
  isFetchingCollections: false,
  errorMessage: null,
};

const catalogReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CatalogTypes.LOAD_COLLECTIONS_START:
      return { ...state, isFetchingCollections: true };
    case CatalogTypes.LOAD_COLLECTIONS_SUCCESS:
      return { ...state, collections: payload, isFetchingCollections: false };
    case CatalogTypes.LOAD_COLLECTIONS_FAIL:
      return { ...state, isFetchingCollections: false, errorMessage: payload };
    default:
      return state;
  }
};

export default catalogReducer;
