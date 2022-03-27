import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  PreviewContainer,
  Title,
  CollectionPreviewContainer,
} from "./collection-preview.styles";

export const CollectionPreview = ({ title, items }) => {
  return (
    <CollectionPreviewContainer>
      <Title>{title.toUpperCase()}</Title>
      <PreviewContainer>
        {items
          .filter((i, idx) => idx < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </PreviewContainer>
    </CollectionPreviewContainer>
  );
};
