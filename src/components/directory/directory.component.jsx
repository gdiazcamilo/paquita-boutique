import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCatalogCollectionList } from "../../redux/catalog/catalog.selectors";

import { MenuItem } from "../menu-item/menu-item.component";

import { DirectoryMenuContainer } from "./directory.styles";

const Directory = ({ collections }) => (
  <DirectoryMenuContainer>
    {collections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </DirectoryMenuContainer>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCatalogCollectionList,
});
export default connect(mapStateToProps)(Directory);
