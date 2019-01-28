import React, { Component } from "react";
import { connect } from "react-redux";

import { getMoviesList } from "../actions/movieAction";

import Movie from "./Movie";

import "../scss/Movies.scss"

class Movies extends Component {
  componentDidMount() {
    this.props.getMoviesList();
  }

  render() {
    const { moviesList } = this.props;
    return (
      <div className="Movies container">
        <div className="row justify-content-center">
          {moviesList.length ? (
            moviesList.map(e => (
              <div key={e.id_movie} className="col col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
                <Movie data={e} />
              </div>
            ))
          ) : (
            <div>
              <p>No film corresponds to your search</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesList: state.movieReducer.moviesList
});

export default connect(
  mapStateToProps,
  { getMoviesList }
)(Movies);
