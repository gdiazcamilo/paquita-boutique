import CartTypes from "./catalog.types";

export const loadCollections = (collections) => ({
  type: CartTypes.LOAD_COLLECTIONS,
  payload: collections,
});
