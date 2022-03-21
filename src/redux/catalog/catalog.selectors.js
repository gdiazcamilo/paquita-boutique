import { createSelector } from "reselect";

const selectCatalog = (state) => state.catalog;

export const selectCatalogCollections = createSelector(
  [selectCatalog],
  (catalog) => catalog.collections
);

export const selectCollection = (collectionName) =>
  createSelector(
    [selectCatalogCollections],
    (sections) => sections[collectionName.toLowerCase()]
  );
