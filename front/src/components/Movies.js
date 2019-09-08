import React, { Component } from "react";
import { connect } from "react-redux";

import { getMoviesList } from "../actions/movieAction";

import Movie from "./Movie";

import "../scss/Movies.scss";

class Movies extends Component {
  componentDidMount() {
    this.props.getMoviesList();
  }

  render() {
    const { moviesList, nameMovieSearch } = this.props;

    return (
      <div className="Movies container-fluid">
        <div className="row ml-2 titleCollection">
          <h3>My collection</h3>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="row d-flex justify-content-center mb-4 mt-4">
            {moviesList.length ? (
              moviesList
                .filter(movie =>
                  movie.name
                    .toLowerCase()
                    .includes(nameMovieSearch.toLowerCase())
                )
                .map(movie => (
                  <div
                    key={movie.id_movie}
                    className="col-12 col-sm-6 col-md-3 col-lg-2  cardMovie"
                  >
                    <Movie data={movie} />
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
  moviesList: state.movieReducer.moviesList
});

export default connect(
  mapStateToProps,
  { getMoviesList }
)(Movies);
