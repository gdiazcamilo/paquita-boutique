import React from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { selectCollection } from "../../redux/catalog/catalog.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

import "./collection.styles.scss";

const CollectionPage = () => {
  const params = useParams();
  const collection = useSelector((state) =>
    selectCollection(params.collectionName)(state)
  );

  if (collection) {
    return (
      <div className='collection-page'>
        <h2 className='title'>{`${collection.title}`}</h2>
        <div className='items'>
          {collection.items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    );
  } else {
    return <h2>Not found</h2>;
  }
};

export default connect()(CollectionPage);
