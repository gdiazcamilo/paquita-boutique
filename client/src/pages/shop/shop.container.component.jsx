import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsFetchingCollection } from "../../redux/catalog/catalog.selectors";
import ShopPage from "./shop.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollection,
});

const ShopPageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(ShopPage);

export default ShopPageContainer;
