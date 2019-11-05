import React, { Component } from "react";
import { connect } from "react-redux";
import dateFormat from "dateformat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faRandom } from "@fortawesome/free-solid-svg-icons";

import convertMinsToHrsMins from "../../helpers/convertMinsToHrsMins";

import { deleteMovie, getRandomMovie, addMovie } from "../../actions/movieAction";

import "../../scss/MovieModal.scss";

class MovieModal extends Component {
  handleDeleteMovie = () => {
    const { movie } = this.props;
    this.props.deleteMovie(movie.id_movie);
  };

  handleAddMovie = () => {
    const { addMovie, moviesList, movie } = this.props;
    addMovie(movie, moviesList);
  };

  handleGetRandomMovie = () => {
    const { getRandomMovie } = this.props;
    getRandomMovie();
  };

  render() {
    const { movie, isRandom, isToAdd } = this.props;

    return (
      <div
        className="modal fade movieModal"
        id={`targ${movie.id_movie}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header text-center">
              <h5 className="modal-title w-100" id="movieName">
                {movie.name}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body p-2">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col-12 col-sm-9">
                      <b>Synopsis: </b>
                      <br />
                      <p>{movie.synopsis || "Synopsis not available"}</p>
                    </div>
                    <div className="col-sm-3 d-none d-sm-block">
                      <img
                        src={movie.link_poster}
                        className="moviePosterModal"
                        alt="Movie poster"
                      />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <b>Category: </b>
                  {movie.name_category}
                </li>
                <li className="list-group-item">
                  <b>Director: </b>

                  {movie.director || "N/A"}
                </li>
                <li className="list-group-item">
                  <b>Release date: </b>

                  {` ${
                    movie.release_date
                      ? dateFormat(movie.release_date, "yyyy-mm-dd")
                      : "N/A"
                  }`}
                </li>
                <li className="list-group-item">
                  <b>Duration: </b>
                  {convertMinsToHrsMins(movie.duration) || "N/A"}
                </li>
              </ul>
            </div>
            <div className="modal-footer justify-content-center">
              {!isToAdd && (
                <button
                  type="button"
                  className="btn deleteBtn"
                  data-dismiss="modal"
                  onClick={this.handleDeleteMovie}
                >
                  Delete
                  <FontAwesomeIcon icon={faTrashAlt} className="icon" />
                </button>
              )}
              {isToAdd && (
                <button
                  type="button"
                  className="btn pl-4 pr-4 addMovieBtn"
                  data-dismiss="modal"
                  onClick={this.handleAddMovie}
                >
                  Add the movie
                </button>
              )}
              {isRandom && (
                <button
                  type="button"
                  className="btn pl-4 pr-4 randomBtn"
                  onClick={this.handleGetRandomMovie}
                >
                  <FontAwesomeIcon icon={faRandom} />
                </button>
              )}
              <button
                type="button"
                className="btn closeBtn"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
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
  { deleteMovie, getRandomMovie, addMovie }
)(MovieModal);
