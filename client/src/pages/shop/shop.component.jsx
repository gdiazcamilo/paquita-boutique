import React from "react";
import { Routes, Route } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

class ShopPage extends React.Component {
  render() {
    return (
      <div>
        <h1>SHOP PAGE</h1>

        <div>
          <Routes>
            <Route path='' element={<CollectionsOverview />} />
            <Route path=':collectionName' element={<CollectionPage />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default ShopPage;
