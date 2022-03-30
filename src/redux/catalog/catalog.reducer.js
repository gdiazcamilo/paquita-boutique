import CatalogTypes from "./catalog.types";

const INITIAL_STATE = {
  collections: {},
};

const catalogReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case CatalogTypes.LOAD_COLLECTIONS:
      return { ...state, collections: payload };
    default:
      return state;
  }
};

export default catalogReducer;
