import React, { Component } from 'react';
import { connect } from 'react-redux';

import MoviePoster from './MoviePoster';
import MovieModal from './MovieModal';
import '../../scss/Movies.scss';

import { AppState } from '../../store';
import { displayModal } from '../../store/movie/movieAction';
import { IMovie } from '../../store/movie/types';

interface IMoviesProps {
  displayModal: Function;
  moviesList: IMovie[];
  moviesListFiltered: IMovie[];
  categoriesSelected: string[];
  pseudo: string;
  showModal: boolean;
  infosMovie: IMovie;
}

class Movies extends Component<IMoviesProps> {
  handleOpenModal = (movie: IMovie) => {
    const { displayModal } = this.props;
    displayModal(movie);
  };

  render() {
    const {
      moviesList,
      moviesListFiltered,
      pseudo,
      categoriesSelected,
      showModal,
      infosMovie,
    } = this.props;

    const moviesListFilteredByCategories = moviesListFiltered.filter(
      (movie) => categoriesSelected.indexOf(movie.nameCategory) === -1,
    );

    return (
      <div className="container moviesContainer mb-3">
        <div className="titleCollection">
          {moviesListFiltered !== undefined && pseudo !== '' ? (
            <h4>
              {`${pseudo}s collection - ${moviesListFilteredByCategories.length} movies`}
            </h4>
          ) : (
            <h4>My collection</h4>
          )}
        </div>
        <div className="row justify-content-center">
          {moviesListFilteredByCategories.length > 0
            && moviesListFilteredByCategories.map((movie) => (
              <button
                key={movie.idMovie}
                className="col-6 col-sm-6 col-md-3 col-lg-2 pt-3 pb-3 pl-0 pr-0"
                type="button"
                data-toggle="modal"
                data-target={`#targ${movie.idMovie}`}
                onClick={() => this.handleOpenModal(movie)}
              >
                <MoviePoster name={movie.name} linkPoster={movie.linkPoster} />
              </button>
            ))}
          {showModal && <MovieModal movie={infosMovie} />}
        </div>
        {moviesList.length === 0 && (
          <div className="row justify-content-center">
            <p className="m-2 noMovieMessage text-center">
              Oops...
              <br />
              There is still no movie in your collection
            </p>
          </div>
        )}
        {((moviesListFiltered.length === 0 && moviesList.length !== 0)
          || moviesListFilteredByCategories.length === 0) && (
          <div className="row justify-content-center">
            <p className="m-2 noMovieMessage text-center">
              Oops...
              <br />
              No movie corresponds to your search
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  moviesList: state.movie.moviesList,
  moviesListFiltered: state.movie.moviesListFiltered,
  categoriesSelected: state.movie.categoriesSelected,
  pseudo: state.auth.pseudo,
  showModal: state.movie.showModal,
  infosMovie: state.movie.infosMovie,
});

export default connect(mapStateToProps, { displayModal })(Movies);
