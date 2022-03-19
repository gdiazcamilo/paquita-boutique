import React from "react";
import { connect } from "react-redux";

import { CollectionPreview } from "../../components/collection-preview/collection-preview.component.jsx";

import "./shop.styles.scss";

const ShopPage = ({ sections }) => (
  <div className='shop-page'>
    <h1>SHOP PAGE</h1>
    {sections.map(({ id, ...otherProps }) => (
      <CollectionPreview key={id} {...otherProps}></CollectionPreview>
    ))}
  </div>
);

const mapStateToProps = (state) => ({
  sections: state.catalog.sections,
});

export default connect(mapStateToProps)(ShopPage);
