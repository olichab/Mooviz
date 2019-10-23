import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faRandom } from "@fortawesome/free-solid-svg-icons";

import {
  getCategoriesList,
  getMovieByCategory,
  getMoviesList,
  clearMoviesList,
  getRandomMovie,
  searchMovieInCollection
} from "../actions/movieAction";

import MovieModal from "./MovieModal";

import "../scss/SearchPart.scss";

class SearchPart extends Component {
  componentDidMount() {
    const { getCategoriesList } = this.props;
    getCategoriesList();
  }

  handeSearchMovieInCollection = e => {
    const { searchMovieInCollection } = this.props;
    searchMovieInCollection(e.target.value);
  };

  handleShowAllMovies = () => {
    const { getMoviesList } = this.props;
    getMoviesList();
  };

  handleClearMoviesList = () => {
    const { clearMoviesList, categoriesList } = this.props;
    clearMoviesList(categoriesList);
  };

  handleGetRandomMovie = () => {
    const { getRandomMovie } = this.props;
    getRandomMovie();
  };

  handleFilterByCategory = nameCategorySelect => {
    const { categoriesList, getMovieByCategory, categoriesSelect } = this.props;
    getMovieByCategory(nameCategorySelect, categoriesList, categoriesSelect);
  };

  render() {
    const { categoriesList, categoriesSelect, randomMovie } = this.props;

    return (
      <div className="SearchPart container-fluid">
        <div className="row justify-content-center mt-3 mb-3">
          <div className="col col-md-9 col-lg-6">
            <div className="input-group flex-nowrap">
              <input
                type="text"
                className="form-control searchBarFilm"
                placeholder="Search a movie"
                aria-label="film name"
                aria-describedby="addon-wrapping"
                onChange={this.handeSearchMovieInCollection}
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-center containerLabelCategory">
          <div className="col-auto p-0 m-1">
            <div
              className={`labelCategoryActive`}
              onClick={this.handleShowAllMovies}
            >
              <b>All</b>
            </div>
          </div>
          <div className="col-auto p-0 m-1">
            <div
              className={`labelCategoryActive`}
              onClick={this.handleClearMoviesList}
            >
              <b>None</b>
            </div>
          </div>
          {categoriesList.length ? (
            categoriesList.map(cat => (
              <div
                key={cat.id_category}
                className="col-auto p-0 m-1"
                onClick={e => this.handleFilterByCategory(cat.name_category)}
              >
                <div
                  className={
                    categoriesSelect.indexOf(cat.name_category) > -1
                      ? "labelCategoryActive inactive"
                      : "labelCategoryActive "
                  }
                >
                  {cat.name_category}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p className="p-0 m-2 noCategory">No category find</p>
            </div>
          )}
        </div>
        <div className="row justify-content-center mt-2">
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
            data-target={`#targ${randomMovie.id_movie}`}
          >
            Random movie
            <span className="icon">
              <FontAwesomeIcon icon={faRandom} />
            </span>
          </button>
          <MovieModal movie={randomMovie} isRandom={true}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.movieReducer.categoriesList,
  movieByCategory: state.movieReducer.movieByCategory,
  categoriesSelect: state.movieReducer.categoriesSelect,
  randomMovie: state.movieReducer.randomMovie
});

export default connect(
  mapStateToProps,
  {
    getCategoriesList,
    getMovieByCategory,
    getMoviesList,
    clearMoviesList,
    getRandomMovie,
    searchMovieInCollection
  }
)(SearchPart);
