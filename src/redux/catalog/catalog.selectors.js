import { createSelector } from "reselect";

const selectCatalog = (state) => state.catalog;

export const selectCatalogSections = createSelector(
  [selectCatalog],
  (catalog) => catalog.sections
);
