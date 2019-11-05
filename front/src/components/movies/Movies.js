import React, { Component } from "react";
import { connect } from "react-redux";

import { getMoviesList } from "../../actions/movieAction";

import MoviePoster from "./MoviePoster";
import MovieModal from "./MovieModal";

import "../../scss/Movies.scss";

class Movies extends Component {
  componentDidMount() {
    const { getMoviesList } = this.props;
    getMoviesList();
  }

  render() {
    const { moviesList, moviesListFiltered, pseudo } = this.props;

    return (
      <div className="container moviesContainer mb-3">
        <div className="titleCollection">
          {moviesListFiltered !== undefined && pseudo !== undefined ? (
            <h4>
              {pseudo}'s collection - {moviesListFiltered.length} movies
            </h4>
          ) : (
            <h4>My collection</h4>
          )}
        </div>
        <div className="row justify-content-center">
          {moviesListFiltered !== undefined &&
            moviesListFiltered.map(movie => (
              <div
                key={movie.id_movie}
                className="col-6 col-sm-6 col-md-3 col-lg-2 pt-3 pb-3 pl-0 pr-0"
                data-toggle="modal"
                data-target={`#targ${movie.id_movie}`}
              >
                <MoviePoster movie={movie} />
                <MovieModal movie={movie} />
              </div>
            ))}
        </div>
        {moviesList.length === 0 && (
          <div className="row justify-content-center">
            <p className="m-2 noMovieMessage text-center">
              Oups...
              <br />
              There is still no movie in your collection
            </p>
          </div>
        )}
        {moviesListFiltered.length === 0 && moviesList.length !== 0 && (
          <div className="row justify-content-center">
            <p className="m-2 noMovieMessage text-center">
              Oups...
              <br />
              No movie corresponds to your search
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesList: state.movieReducer.moviesList,
  moviesListFiltered: state.movieReducer.moviesListFiltered,
  pseudo: state.authReducer.pseudo
});

export default connect(
  mapStateToProps,
  { getMoviesList }
)(Movies);
