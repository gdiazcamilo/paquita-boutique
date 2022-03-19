import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCatalogSections } from "../../redux/catalog/catalog.selectors.js";
import { CollectionPreview } from "../collection-preview/collection-preview.component.jsx";

import "./collections-overview.styles.scss";

const CollectionsOverview = ({ sections }) => (
  <div className='collections-overview'>
    {sections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps}></CollectionPreview>
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectCatalogSections,
});

export default connect(mapStateToProps)(CollectionsOverview);
