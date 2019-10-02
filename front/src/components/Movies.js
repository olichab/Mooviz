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

  componentDidUpdate(prevProps) {
    const { getMoviesList } = this.props;
    //Refresh moviesList after movie deleted
    if (prevProps.moviesList.length === this.props.moviesList.length) {
      getMoviesList();
    }
  }

  render() {
    const { moviesList, nameMovieSearch, pseudo, msgDeletedMovie } = this.props;

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
          {//Display message movie deleted
          msgDeletedMovie.title !== "" && (
            <div className="row justify-content-center">
              <div className="col-12 col-sm-6 col-md-4">
                <div className="alert alert-info msgDeletedMovie" role="alert">
                  <h4 className="alert-heading title">
                    {msgDeletedMovie.title}
                  </h4>
                  <hr />
                  <p className="text">{msgDeletedMovie.text}</p>
                </div>
              </div>
            </div>
          )}
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
  nameMovieSearch: state.movieReducer.nameMovieSearch,
  pseudo: state.authReducer.pseudo,
  msgDeletedMovie: state.movieReducer.msgDeletedMovie
});

export default connect(
  mapStateToProps,
  { getMoviesList, searchMovieInCollection }
)(Movies);
