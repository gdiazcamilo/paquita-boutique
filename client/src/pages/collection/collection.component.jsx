import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/catalog/catalog.selectors";

import {
  CollectionPage as CollectionPageContainer,
  Title,
  ItemsContainer,
} from "./collection.styles.jsx";

const CollectionPage = () => {
  const params = useParams();
  const collection = useSelector((state) =>
    selectCollection(params.collectionName)(state)
  );

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

export default connect()(CollectionPage);
