import React, { useContext } from "react";

import CollectionContext from "../../contexts/collections/collections.context.js";
import { CollectionPreview } from "../collection-preview/collection-preview.component.jsx";

import { CollectionsOverviewContainer } from "./collections-overview.styles";

const CollectionsOverview = () => {
  const collections = Object.values(useContext(CollectionContext));
  return (
    <CollectionsOverviewContainer>
      {collections.map(({ id, ...otherProps }) => (
        <CollectionPreview key={id} {...otherProps}></CollectionPreview>
      ))}
    </CollectionsOverviewContainer>
  );
};

export default CollectionsOverview;
