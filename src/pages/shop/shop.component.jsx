import React from "react";
import { CollectionPreview } from "../../components/collection-preview/collection-preview.component.jsx";

import SHOP_DATA from "./shop.data.js";

import "./shop.styles.scss";

class ShopPage extends React.Component {
  constructor() {
    super();

    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className='shop-page'>
        <h1>SHOP PAGE</h1>
        {collections.map(({ id, ...otherProps }) => (
          <CollectionPreview key={id} {...otherProps}></CollectionPreview>
        ))}
      </div>
    );
  }
}

export default ShopPage;
