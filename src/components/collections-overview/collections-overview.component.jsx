import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCatalogCollections } from "../../redux/catalog/catalog.selectors.js";
import { CollectionPreview } from "../collection-preview/collection-preview.component.jsx";

import "./collections-overview.styles.scss";

const CollectionsOverview = ({ collections }) => (
  <div className='collections-overview'>
    {Object.values(collections).map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps}></CollectionPreview>
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCatalogCollections,
});

export default connect(mapStateToProps)(CollectionsOverview);
