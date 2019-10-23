import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getMoviesList,
  getInfosMovieByName,
  getInfosMovie,
  searchMovieToAdd
} from "../actions/movieAction";

import MovieModal from "./MovieModal";

import "../scss/AddMovie.scss";

class AddMovie extends Component {
  componentDidMount() {
    this.props.getMoviesList();
  }

  handleSearchMovieToAdd = e => {
    const { searchMovieToAdd, getInfosMovieByName } = this.props;
    searchMovieToAdd(e.target.value);
    getInfosMovieByName(e.target.value);
  };

  handleChoosePoster = idMovie => {
    const { getInfosMovie } = this.props;
    getInfosMovie(idMovie);
  };

  render() {
    const {
      infosMovieByName,
      infosMovie,
      nameMovieToAdd
    } = this.props;

    return (
      <div>
        <form>
          <div className="SearchPartAddMovie container-fluid">
            <div className="row justify-content-center mt-3 mb-3">
              <div className="col col-md-9 col-lg-6">
                <div className="input-group flex-nowrap">
                  <input
                    type="text"
                    id="nameMovie"
                    className="form-control searchBarFilm"
                    placeholder="What movie do you want to add ?"
                    aria-label="film name"
                    aria-describedby="addon-wrapping"
                    onChange={this.handleSearchMovieToAdd}
                    value={nameMovieToAdd}
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center m-2">
              <button type="button" className="btn m-2 backToCollectionBtn">
                <Link to="/collection" className="linkUnstyled">
                  <div className="d-inline p-1">
                    <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                  </div>
                  Back to my collection
                </Link>
              </button>
            </div>
          </div>
          {infosMovieByName.length && (
            // Poster list according to search
            <div className="moviesPosterContainer container-fluid ">
              <div className="row justify-content-center ">
                {infosMovieByName.map(
                  movie =>
                    movie.link_poster && (
                      <div
                        key={movie.id}
                        className="col-6 col-sm-6 col-md-3 col-lg-2 pt-3 pb-3 pl-0 pr-0"
                        data-toggle="modal"
                        data-target={`#targ${movie.id_movie}`}
                      >
                        <img
                          src={movie.link_poster}
                          className="moviePoster"
                          alt="Movie poster"
                          onClick={() => this.handleChoosePoster(movie.id)}
                        />
                        <div className="nameMovie">{movie.name}</div>
                        <MovieModal
                          movie={infosMovie}
                          isToAdd={true}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.movieReducer.categoriesList,
  infosMovieByName: state.movieReducer.infosMovieByName,
  infosMovie: state.movieReducer.infosMovie,
  nameMovieToAdd: state.movieReducer.nameMovieToAdd
});

export default connect(
  mapStateToProps,
  {
    getMoviesList,
    getInfosMovieByName,
    getInfosMovie,
    searchMovieToAdd
  }
)(AddMovie);
