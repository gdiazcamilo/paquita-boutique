import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsFetchingCollection } from "../../redux/catalog/catalog.selectors";
import HomePage from "./homepage.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollection,
});

const HomePageContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(HomePage);

// the code above is the same as:
// const HomePageWithSpinner = WithSpinner(HomePage)
// const HomePageContainer = connect(HomePageWithSpinner)

export default HomePageContainer;
