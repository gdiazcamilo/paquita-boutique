import { createSelector } from "reselect";

const selectCatalog = (state) => state.catalog;

const selectCatalogCollections = createSelector(
  [selectCatalog],
  (catalog) => catalog.collections
);

export const selectCatalogCollectionList = createSelector(
  [selectCatalogCollections],
  (collections) =>
    Object.values(collections).sort((a, b) => (a.size === undefined ? -1 : 1))
);

export const selectCollection = (collectionName) =>
  createSelector(
    [selectCatalogCollections],
    (sections) => sections[collectionName.toLowerCase()]
  );

export const selectIsFetchingCollection = createSelector(
  [selectCatalog],
  (catalog) => catalog.isFetchingCollections
);
