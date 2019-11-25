import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import dateFormat from 'dateformat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faRandom } from '@fortawesome/free-solid-svg-icons';

import convertMinsToHrsMins from '../../helpers/convertMinsToHrsMins';
import '../../scss/MovieModal.scss';

import { AppState } from '../../store';
import {
  deleteMovie,
  getRandomMovie,
  addMovie,
  hideModal,
} from '../../store/movie/movieAction';
import { IMovie } from '../../store/movie/types';

interface IMovieModalProps {
  deleteMovie: Function;
  getRandomMovie: Function;
  addMovie: Function;
  hideModal: Function;
  movie: IMovie;
  showModalRandom: boolean;
  showModalAddMovie: boolean;
}

class MovieModal extends Component<IMovieModalProps> {
  componentDidMount() {
    $('.movieModal').modal({ backdrop: 'static' });
  }

  handleDeleteMovie = () => {
    const { movie, deleteMovie } = this.props;
    deleteMovie(movie.idMovie);
  };

  handleAddMovie = () => {
    const { addMovie, movie } = this.props;
    addMovie(movie);
  };

  handleGetRandomMovie = () => {
    const { getRandomMovie } = this.props;
    getRandomMovie();
  };

  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
    $('.movieModal').modal('hide');
  };

  render() {
    const { movie, showModalRandom, showModalAddMovie } = this.props;

    return (
      <div
        className="modal fade movieModal"
        id={`targ${movie.idMovie}`}
        role="dialog"
        aria-labelledby="modalMovie"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
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
                aria-label="Close"
                onClick={this.handleHideModal}
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
                      <p>{movie.synopsis || 'Synopsis not available'}</p>
                    </div>
                    <div className="col-sm-3 d-none d-sm-block">
                      <img
                        src={movie.linkPoster}
                        className="moviePosterModal"
                        alt="Movie poster"
                      />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <b>Category: </b>
                  {movie.nameCategory}
                </li>
                <li className="list-group-item">
                  <b>Director: </b>

                  {movie.director || 'N/A'}
                </li>
                <li className="list-group-item">
                  <b>Release date: </b>

                  {` ${
                    movie.releaseDate
                      ? dateFormat(movie.releaseDate, 'yyyy-mm-dd')
                      : 'N/A'
                  }`}
                </li>
                <li className="list-group-item">
                  <b>Duration: </b>
                  {movie.duration
                    ? convertMinsToHrsMins(movie.duration)
                    : 'N/A'}
                </li>
              </ul>
            </div>
            <div className="modal-footer justify-content-center">
              {!showModalAddMovie && (
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
              {showModalAddMovie && (
                <button
                  type="button"
                  className="btn pl-4 pr-4 addMovieBtn"
                  data-dismiss="modal"
                  onClick={this.handleAddMovie}
                >
                  Add the movie
                </button>
              )}
              {showModalRandom && (
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
                onClick={this.handleHideModal}
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

const mapStateToProps = (state: AppState) => ({
  moviesList: state.movie.moviesList,
  showModalRandom: state.movie.showModalRandom,
  showModalAddMovie: state.movie.showModalAddMovie,
});

export default connect(mapStateToProps, {
  deleteMovie,
  getRandomMovie,
  addMovie,
  hideModal,
})(MovieModal);
