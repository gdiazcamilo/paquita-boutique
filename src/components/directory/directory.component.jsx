import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCatalogCollections } from "../../redux/catalog/catalog.selectors";

import { MenuItem } from "../menu-item/menu-item.component";

import "./directory.styles.scss";

const Directory = ({ collections }) => (
  <div className='directory-menu'>
    {Object.values(collections).map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCatalogCollections,
});
export default connect(mapStateToProps)(Directory);
