import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import CollectionContext from "../../contexts/collections/collections.context";
import CollectionItem from "../../components/collection-item/collection-item.component";

import {
  CollectionPage as CollectionPageContainer,
  Title,
  ItemsContainer,
} from "./collection.styles.jsx";

const CollectionPage = () => {
  const params = useParams();
  const collections = useContext(CollectionContext);
  const collection = collections[params.collectionName];

  if (collection) {
    return (
      <CollectionPageContainer>
        <Title>{`${collection.title}`}</Title>
        <ItemsContainer>
          {collection.items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </ItemsContainer>
      </CollectionPageContainer>
    );
  } else {
    return <h2>Not found</h2>;
  }
};

export default CollectionPage;
