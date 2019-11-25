import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faRandom } from '@fortawesome/free-solid-svg-icons';

import MovieModal from './MovieModal';
import '../../scss/SearchPart.scss';

import { AppState } from '../../store';
import {
  getMovieByCategory,
  getMoviesList,
  clearMoviesList,
  getRandomMovie,
  searchMovieInCollection,
  displayModalRandom,
} from '../../store/movie/movieAction';
import { IMovie, ICategorie } from '../../store/movie/types';

interface ISearchPartProps {
  getMovieByCategory: Function;
  getMoviesList: Function;
  clearMoviesList: Function;
  getRandomMovie: Function;
  searchMovieInCollection: Function;
  displayModalRandom: Function;
  categoriesList: ICategorie[];
  categoriesSelected: string[];
  randomMovie: IMovie;
  nameMovieSearch: string;
  showModalRandom: boolean;
}

class SearchPart extends Component<ISearchPartProps> {
  handeSearchMovieInCollection = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { searchMovieInCollection } = this.props;
    searchMovieInCollection(e.target.value);
  };

  handleShowAllMovies = () => {
    const { getMoviesList } = this.props;
    getMoviesList();
  };

  handleClearMoviesList = () => {
    const { clearMoviesList } = this.props;
    clearMoviesList();
  };

  handleGetRandomMovie = () => {
    const { getRandomMovie, displayModalRandom, randomMovie } = this.props;
    getRandomMovie();
    displayModalRandom(randomMovie);
  };

  handleFilterByCategory = (nameCategorySelect: string) => {
    const { getMovieByCategory } = this.props;
    getMovieByCategory(nameCategorySelect);
  };

  render() {
    const {
      categoriesList,
      randomMovie,
      nameMovieSearch,
      categoriesSelected,
      showModalRandom,
    } = this.props;

    return (
      <div className="container SearchPart">
        <div className="row justify-content-center ml-1 mr-1 mb-3">
          <div className="col col-md-9 col-lg-6">
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control searchBarFilm"
                placeholder="Search a movie"
                aria-label="film name"
                aria-describedby="addon-wrapping"
                onChange={this.handeSearchMovieInCollection}
                value={nameMovieSearch}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center containerLabelCategory">
          <div className="col-auto p-0 m-1">
            <button
              className="labelCategoryActive"
              type="button"
              onClick={this.handleShowAllMovies}
            >
              <b>All</b>
            </button>
          </div>
          <div className="col-auto p-0 m-1">
            <button
              className="labelCategoryActive"
              type="button"
              onClick={this.handleClearMoviesList}
            >
              <b>None</b>
            </button>
          </div>
          {categoriesList.length ? (
            categoriesList.map((cat) => (
              <button
                key={cat.idCategory}
                className="col-auto p-0 m-1"
                type="button"
                onClick={() => this.handleFilterByCategory(cat.nameCategory)}
              >
                <div
                  className={
                    categoriesSelected.indexOf(cat.nameCategory) > -1
                      ? 'labelCategoryActive inactive'
                      : 'labelCategoryActive '
                  }
                >
                  {cat.nameCategory}
                </div>
              </button>
            ))
          ) : (
            <div>
              <p className="p-0 m-2 noCategory">No category found</p>
            </div>
          )}
        </div>
        <div className="row justify-content-center no-gutters">
          <Link to="/addmovie">
            <button type="button" className="btn m-2 addBtn">
              Add a movie
              <span className="icon">
                <FontAwesomeIcon icon={faPlusCircle} />
              </span>
            </button>
          </Link>
          <button
            type="button"
            className="btn m-2 randomBtn"
            onClick={this.handleGetRandomMovie}
            data-toggle="modal"
            data-target={`#targ${randomMovie.idMovie}`}
          >
            Random movie
            <span className="icon">
              <FontAwesomeIcon icon={faRandom} />
            </span>
          </button>
        </div>
        {showModalRandom && <MovieModal movie={randomMovie} />}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  categoriesList: state.movie.categoriesList,
  categoriesSelected: state.movie.categoriesSelected,
  randomMovie: state.movie.randomMovie,
  nameMovieSearch: state.movie.nameMovieSearch,
  showModalRandom: state.movie.showModalRandom,
});

export default connect(mapStateToProps, {
  getMovieByCategory,
  getMoviesList,
  clearMoviesList,
  getRandomMovie,
  searchMovieInCollection,
  displayModalRandom,
})(SearchPart);
