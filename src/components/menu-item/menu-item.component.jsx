import React from "react";
import { useNavigate } from "react-router-dom";

import {
  MenuItemContainer,
  BackgroundImage,
  TextContainer,
  Title,
  SubTitle,
} from "./menu-item.styles";

export const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  let navigate = useNavigate();

  return (
    <MenuItemContainer
      className={`${size || ""}`}
      onClick={() => navigate(linkUrl)}
    >
      <BackgroundImage
        className='background-image'
        imageUrl={imageUrl}
      ></BackgroundImage>
      <TextContainer className='content'>
        <Title>{title.toUpperCase()}</Title>
        <SubTitle>SHOP NOW</SubTitle>
      </TextContainer>
    </MenuItemContainer>
  );
};
