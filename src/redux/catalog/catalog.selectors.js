import { createSelector } from "reselect";

const selectCatalog = (state) => state.catalog;

const selectCatalogCollections = createSelector(
  [selectCatalog],
  (catalog) => catalog.collections
);

export const selectCatalogCollectionList = createSelector(
  [selectCatalogCollections],
  (collections) => Object.values(collections)
);

export const selectCollection = (collectionName) =>
  createSelector(
    [selectCatalogCollections],
    (sections) => sections[collectionName.toLowerCase()]
  );
