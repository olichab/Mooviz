import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import convertMinsToHrsMins from "../helpers/convertMinsToHrsMins";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import {
  getMoviesList,
  getCategoriesList,
  getMoviePoster,
  getInfosMovie,
  addMovie,
  searchMovieToAdd
} from "../actions/movieAction";

import "../scss/AddMovie.scss";

class AddMovie extends Component {
  componentDidMount() {
    this.props.getCategoriesList();
    this.props.getMoviesList();
  }

  handleSearchMovieToAdd = e => {
    const { searchMovieToAdd, getMoviePoster } = this.props;
    searchMovieToAdd(e.target.value);
    getMoviePoster(e.target.value);
  };

  handleChoosePoster = e => {
    const { getInfosMovie } = this.props;
    const idMovie = e.target.id;
    getInfosMovie(idMovie);
  };

  handleAddMovie = e => {
    const { addMovie, moviesList, infosMovie } = this.props;
    addMovie(infosMovie, moviesList);
  };

  render() {
    const {
      moviePoster,
      infosMovie,
      msgAddMovie,
      nameMovieToAdd,
      showInfosMovie
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
              <button type="button" className="btn btnBackToCollection m-2">
                <Link to="/collection">
                  <div className="d-inline p-1">
                    <FontAwesomeIcon icon={faArrowLeft} className="iconBrown" />
                  </div>
                  BACK TO MY COLLECTION
                </Link>
              </button>
            </div>
            {//Display message movie added or not
            msgAddMovie.title !== "" && !nameMovieToAdd.length && (
              <div className="row justify-content-center">
                <div className="col-12 col-sm-6 col-md-4">
                  <div className="alert alert-info msgAddMovie" role="alert">
                    <h4 className="alert-heading title">{msgAddMovie.title}</h4>
                    <hr />
                    <p className="text">{msgAddMovie.text}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {moviePoster.length && !showInfosMovie && (
            // Poster list according to search
            <div className="moviesPosterContainer container-fluid ">
              <div className="row justify-content-center ">
                {moviePoster.map(
                  poster =>
                    poster.poster_path && (
                      <div
                        className="col-12 col-sm-6 col-md-3 col-lg-2 poster-movie"
                        key={poster.id}
                        value={poster.poster_path}
                        onClick={this.handleChoosePoster}
                      >
                        <img
                          src={`https://image.tmdb.org/t/p/original/${
                            poster.poster_path
                          }`}
                          alt="Movie poster"
                          name={poster.title}
                          id={poster.id}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          )}
          {showInfosMovie && (
            // Movie infos after click on poster
            <div className="infosMovieContainer container-fluid">
              <div className="row text-center text-md-right">
                <div className="col-12 col-md-4">
                  <img
                    src={infosMovie.link_poster}
                    alt={`Movie poster ${infosMovie.name}`}
                    name={infosMovie.name}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <div className="row textInfos text-center text-md-left p-3">
                    <div className="col-12 m-2">
                      <h3>{infosMovie.name}</h3>
                    </div>
                    <div className="col-12 m-1">
                      <span className="titleInfos">
                        <b>Category : </b>
                      </span>
                      <span className="textInfos">
                        {infosMovie.category || "N/A"}
                      </span>
                    </div>
                    <div className="col-12 m-1">
                      <span className="titleInfos">
                        <b>Synopsis : </b>
                      </span>
                      <span className="textInfos">
                        {infosMovie.synopsis || "N/A"}
                      </span>
                    </div>
                    <div className="col-12 m-1">
                      <span className="titleInfos">
                        <b>Director : </b>
                      </span>
                      <span className="textInfos">
                        {infosMovie.director || "N/A"}
                      </span>
                    </div>
                    <div className="col-12 m-1">
                      <span className="titleInfos">
                        <b>Release date : </b>
                      </span>
                      <span className="textInfos">
                        {infosMovie.release_date || "N/A"}
                      </span>
                    </div>
                    <div className="col-12 m-1">
                      <span className="titleInfos">
                        <b>Duration : </b>
                      </span>
                      <span className="textInfos">
                        {convertMinsToHrsMins(infosMovie.duration) || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center m-4">
                <div className="col-12">
                  <button
                    type="button"
                    className="btn btnAddMovie"
                    onClick={this.handleAddMovie}
                  >
                    Add the movie
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  moviesList: state.movieReducer.moviesList,
  categoriesList: state.movieReducer.categoriesList,
  moviePoster: state.movieReducer.moviePoster,
  infosMovie: state.movieReducer.infosMovie,
  msgAddMovie: state.movieReducer.msgAddMovie,
  nameMovieToAdd: state.movieReducer.nameMovieToAdd,
  showInfosMovie: state.movieReducer.showInfosMovie
});

export default connect(
  mapStateToProps,
  {
    getMoviesList,
    getCategoriesList,
    getMoviePoster,
    getInfosMovie,
    addMovie,
    searchMovieToAdd
  }
)(AddMovie);
