import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import { selectIsFetchingCollection } from "../../redux/catalog/catalog.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollection,
});

/* This is a HOC that connects the component passed by parameter (`WrappedComponent`) 
with the store to look for the isCollectionFetching prop and Wrap the passed component with the WithSpinner component 
so it renders a loading animation while collection is being fetch. */

const WithSpinnerContainer = (WrappedComponent) =>
  compose(connect(mapStateToProps), WithSpinner)(WrappedComponent);

export default WithSpinnerContainer;
