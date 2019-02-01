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
      <div className="Movies container">
        <div className="accordion" id="accordionExample">
          <div className="row justify-content-center">
            {moviesList.length ? (
              moviesList
                .filter(e =>
                  e.name.toLowerCase().includes(nameMovieSearch.toLowerCase())
                )
                .map(e => (
                  <div
                    key={e.id_movie}
                    className="col-6 col-md-3 col-lg-2 mb-4 d-flex justify-content-center"
                  >
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
