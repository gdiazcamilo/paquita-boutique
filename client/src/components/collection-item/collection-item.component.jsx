import React from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions";

import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  Name,
  Price,
  CollectionItemButton,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <ImageContainer className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </CollectionFooterContainer>
      <CollectionItemButton inverted={true} onClick={() => addItem(item)}>
        Add to cart
      </CollectionItemButton>
    </CollectionItemContainer>
  );
};

export default connect(null, { addItem })(CollectionItem);
