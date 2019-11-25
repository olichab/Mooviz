import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import MoviePoster from './MoviePoster';
import MovieModal from './MovieModal';
import '../../scss/AddMovie.scss';

import { AppState } from '../../store';
import {
  getInfosMovieByName,
  getInfosMovie,
  searchMovieToAdd,
  displayModalAddMovie,
} from '../../store/movie/movieAction';
import { IMovie, IInfosMovieByName } from '../../store/movie/types';

interface IAddMovieProps {
  getInfosMovieByName: Function;
  getInfosMovie: Function;
  searchMovieToAdd: Function;
  displayModalAddMovie: Function;
  infosMovieByName: IInfosMovieByName[];
  infosMovie: IMovie;
  nameMovieToAdd: string;
  showModalAddMovie: boolean;
}

class AddMovie extends Component<IAddMovieProps> {
  handleSearchMovieToAdd = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      searchMovieToAdd,
      getInfosMovieByName,
      infosMovieByName,
    } = this.props;
    searchMovieToAdd(e.target.value);
    if (e.target.value.length > 2) {
      getInfosMovieByName(e.target.value);
    } else {
      infosMovieByName.length = 0;
    }
  };

  handleChoosePoster = (idMovie: number) => {
    const { getInfosMovie, displayModalAddMovie } = this.props;
    getInfosMovie(idMovie);
    displayModalAddMovie();
  };

  render() {
    const {
      infosMovieByName,
      infosMovie,
      nameMovieToAdd,
      showModalAddMovie,
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
          <div className="container-fluid">
            <div className="row justify-content-center ">
              {infosMovieByName.length > 0
                // Poster list according to search
                && infosMovieByName.map((movie) => (
                  <button
                    key={movie.id}
                    className="col-6 col-sm-6 col-md-3 col-lg-2 pt-3 pb-3 pl-0 pr-0"
                    type="button"
                    data-toggle="modal"
                    data-target={`#targ${movie.id}`}
                    onClick={() => this.handleChoosePoster(movie.id)}
                  >
                    <MoviePoster
                      name={movie.name}
                      linkPoster={movie.linkPoster}
                    />
                  </button>
                ))}
              {showModalAddMovie && <MovieModal movie={infosMovie} />}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  infosMovieByName: state.movie.infosMovieByName,
  infosMovie: state.movie.infosMovie,
  nameMovieToAdd: state.movie.nameMovieToAdd,
  showModalAddMovie: state.movie.showModalAddMovie,
});

export default connect(mapStateToProps, {
  getInfosMovieByName,
  getInfosMovie,
  searchMovieToAdd,
  displayModalAddMovie,
})(AddMovie);
