import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverview = lazy(() =>
  import("../../components/collections-overview/collections-overview.component")
);
const CollectionPage = lazy(() => import("../collection/collection.component"));

class ShopPage extends React.Component {
  render() {
    return (
      <div>
        <h1>SHOP PAGE</h1>

        <div>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='' element={<CollectionsOverview />} />
              <Route path=':collectionName' element={<CollectionPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    );
  }
}

export default ShopPage;
