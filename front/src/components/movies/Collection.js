import React, { Component } from "react";
import { connect } from "react-redux";

import { getMoviesList, getCategoriesList } from "../../actions/movieAction";

import Movies from "./Movies";
import SearchPart from "./SearchPart";
import Spinner from "../Spinner";

class Collection extends Component {
  componentDidMount() {
    const { getMoviesList, getCategoriesList } = this.props;
    getMoviesList();
    getCategoriesList();
  }

  render() {
    const { loading } = this.props;

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <SearchPart />
            <Movies />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.movieReducer.loading
});

export default connect(
  mapStateToProps,
  { getMoviesList, getCategoriesList }
)(Collection);
