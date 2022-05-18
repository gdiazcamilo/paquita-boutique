import React, { useContext } from "react";

import CartContext from "../../contexts/cart/cart.context";

import {
  CollectionItemContainer,
  ImageContainer,
  CollectionFooterContainer,
  Name,
  Price,
  CollectionItemButton,
} from "./collection-item.styles";

const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const { addItem } = useContext(CartContext);
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

export default CollectionItem;
