import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRandom } from "@fortawesome/free-solid-svg-icons";

import {
  getCategoriesList,
  getMovieByCategory,
  getMoviesList,
  clearMoviesList,
  getRandomMovie,
  searchMovieInCollection
} from "../actions/movieAction";

import "../scss/SearchPart.scss";

class SearchPart extends Component {
  componentWillMount() {
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

  handleShowRandomMovie = () => {
    const { getRandomMovie } = this.props;
    getRandomMovie();
  };

  handleFilterByCategory = nameCategorySelect => {
    const { categoriesList, getMovieByCategory, categoriesSelect } = this.props;
    getMovieByCategory(nameCategorySelect, categoriesList, categoriesSelect);
  };

  render() {
    const { categoriesList, categoriesSelect } = this.props;

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
              <p className="p-0 m-2 noCategory">No category</p>
            </div>
          )}
        </div>
        <div className="row justify-content-center align-items-center m-2">
          <Link to="/addmovie">
            <button type="button" className="btn btnAddMovie m-2">
              <div className="d-inline p-1">
                <FontAwesomeIcon icon={faPlus} className="iconBrown" />
              </div>
              ADD A MOVIE
            </button>
          </Link>
          <button
            type="button"
            className="btn btnRandomMovie m-2"
            onClick={this.handleShowRandomMovie}
          >
            <div className="d-inline p-1">
              <FontAwesomeIcon icon={faRandom} className="iconBrown" />
            </div>
            <p className="d-inline p-1">RANDOM MOVIE</p>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.movieReducer.categoriesList,
  movieByCategory: state.movieReducer.movieByCategory,
  categoriesSelect: state.movieReducer.categoriesSelect
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
