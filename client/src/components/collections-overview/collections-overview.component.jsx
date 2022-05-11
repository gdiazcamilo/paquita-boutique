import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCatalogCollectionList } from "../../redux/catalog/catalog.selectors.js";

import { CollectionPreview } from "../collection-preview/collection-preview.component.jsx";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps}></CollectionPreview>
    ))}
  </CollectionsOverviewContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCatalogCollectionList,
});

export default connect(mapStateToProps)(CollectionsOverview);
