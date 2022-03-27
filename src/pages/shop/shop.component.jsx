import React from "react";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";

import { ShopPageContainer } from "./shop.styles";

const ShopPage = () => (
  <ShopPageContainer>
    <h1>SHOP PAGE</h1>
    <CollectionsOverview />
  </ShopPageContainer>
);

export default ShopPage;
