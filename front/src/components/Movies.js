import React, { Component } from "react";
import { connect } from "react-redux";

import { getMoviesList, searchMovieInCollection } from "../actions/movieAction";

import Movie from "./Movie";

import "../scss/Movies.scss";

class Movies extends Component {
  componentWillMount() {
    const { getMoviesList } = this.props;
    getMoviesList();
  }

  render() {
    const { moviesList, nameMovieSearch } = this.props;
    const pseudo = localStorage.pseudo;

    return (
      <div className="Movies container-fluid">
        <div className="row ml-2 titleCollection">
          {moviesList !== undefined && pseudo !== undefined ? (
            <h3>
              {pseudo}'s collection ({moviesList.length} movies)
            </h3>
          ) : (
            <h3>My collection</h3>
          )}
        </div>
        <div className="accordion" id="accordionMovie">
          <div className="row d-flex justify-content-center mb-4 mt-4">
            {moviesList !== undefined ? (
              moviesList
                .filter(movie =>
                  movie.name
                    .toLowerCase()
                    .includes(nameMovieSearch.toLowerCase())
                )
                .map(movie => (
                  <div
                    key={movie.id_movie}
                    className="col-12 col-sm-6 col-md-3 col-lg-2 cardMovie"
                  >
                    <Movie movie={movie} />
                  </div>
                ))
            ) : (
              <div>
                <p className="noMovieMessage m-4">
                  No film corresponds to your search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesList: state.movieReducer.moviesList,
  nameMovieSearch: state.movieReducer.nameMovieSearch
});

export default connect(
  mapStateToProps,
  { getMoviesList, searchMovieInCollection }
)(Movies);
