import React, { Component } from 'react';
import { connect } from 'react-redux';

import Movies from './Movies';
import SearchPart from './SearchPart';
import Spinner from '../Spinner';

import { AppState } from '../../store';
import {
  getMoviesList,
  getCategoriesList,
} from '../../store/movie/movieAction';

interface ICollectionProps {
  getMoviesList: Function;
  getCategoriesList: Function;
  loading: boolean;
}

class Collection extends Component<ICollectionProps> {
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

const mapStateToProps = (state: AppState) => ({
  loading: state.movie.loading,
});

export default connect(mapStateToProps, { getMoviesList, getCategoriesList })(
  Collection,
);
