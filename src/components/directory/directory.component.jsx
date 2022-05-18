import React, { useContext } from "react";

import CollectionContext from "../../contexts/collections/collections.context";
import { MenuItem } from "../menu-item/menu-item.component";

import { DirectoryMenuContainer } from "./directory.styles";

const Directory = () => {
  const collections = Object.values(useContext(CollectionContext));
  return (
    <DirectoryMenuContainer>
      {collections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </DirectoryMenuContainer>
  );
};

export default Directory;
