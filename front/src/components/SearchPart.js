import React, { Component } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRandom } from "@fortawesome/free-solid-svg-icons";

import {
  getCategoriesList,
  getMovieByCategory,
  getMoviesList,
  clearMoviesList,
  getRandomMovie,
  getMovieByName
} from "../actions/movieAction";

import "../scss/SearchPart.scss";

class SearchPart extends Component {
  state = {
    searchName: "",
    categoriesSelect: []
  };

  componentDidMount() {
    this.props.getCategoriesList();
  }

  handeChangeSearch = e => {
    this.props.handleSearchMovie(e.target.value);
    this.setState({
      searchName: e.target.value
    });
  };

  handleSortByName = e => {
    e.preventDefault();
    const name = this.state.searchName;
    this.props.getMovieByName(name);
  };

  handleShowAllMovies = () => {
    this.props.getMoviesList();
    this.setState({
      categoriesSelect: []
    });
  };

  handleClearMoviesList = () => {
    this.props.clearMoviesList();

    this.setState({
      categoriesSelect: this.props.categoriesList
    });
  };

  handleShowRandomMovie = () => {
    this.props.getRandomMovie();
  };

  toggleLabelCategory = (e, nameCategory, index) => {
    const { categoriesList } = this.props;
    const { categoriesSelect } = this.state;

    const filteredMovieByCategory = () => {
      this.props.getMovieByCategory(
        categoriesList.filter(cat => !this.state.categoriesSelect.includes(cat))
      );
    };

    // Get movie by categories selected
    if (categoriesSelect.indexOf(nameCategory) > -1) {
      // if nameCategory is in categoriesSelect, filter array
      this.setState(
        {
          categoriesSelect: categoriesSelect.filter(name => {
            return name !== nameCategory;
          })
        },
        () => {
          categoriesList.length !== this.state.categoriesSelect.length
            ? filteredMovieByCategory()
            : this.handleShowAllMovies();
        }
      );
    } else {
      // if nameCategory is NOT in categoriesSelect, add category
      this.setState(
        {
          categoriesSelect: [...categoriesSelect, nameCategory]
        },
        () => {
          categoriesList.length !== this.state.categoriesSelect.length
            ? filteredMovieByCategory()
            : this.handleClearMoviesList();
        }
      );
    }
  };

  render() {
    const { labelCategoryClassInactive, categoriesSelect } = this.state;
    const { categoriesList } = this.props;

    return (
      <div className="SearchPart container-fluid">
        <div className="row justify-content-center mt-3 mb-3">
          <div className="col col-md-9 col-lg-6">
            <form onSubmit={this.handleSortByName}>
              <div className="input-group flex-nowrap">
                <input
                  type="text"
                  className="form-control searchBarFilm"
                  placeholder="Search a film"
                  aria-label="film name"
                  aria-describedby="addon-wrapping"
                  onChange={this.handeChangeSearch}
                  value={this.state.searchName}
                />
              </div>
            </form>
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
              className={`labelCategoryActive ${labelCategoryClassInactive}`}
              onClick={this.handleClearMoviesList}
            >
              <b>None</b>
            </div>
          </div>
          {categoriesList.length ? (
            categoriesList.map((category, index) => (
              <div
                key={index}
                className="col-auto p-0 m-1"
                onClick={e => this.toggleLabelCategory(e, category, index)}
              >
                <div
                  className={
                    categoriesSelect.indexOf(category) !== -1
                      ? "labelCategoryActive inactive"
                      : "labelCategoryActive "
                  }
                >
                  {category}
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>No category</p>
            </div>
          )}
        </div>
        <div className="container- mt-3">
          <div className="row justify-content-center align-items-center" />
          <button type="button" className="btn btnAddMovie m-2" onClick={this.a}>
            <div className="d-inline p-1">
              <FontAwesomeIcon icon={faPlus} className="iconBrown" />
            </div>
            <p className="d-inline p-1">ADD A MOVIE</p>
          </button>
          <button type="button" className="btn btnAddMovie m-2" onClick={this.handleShowRandomMovie}>
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
  moviesList: state.movieReducer.moviesList
});

export default connect(
  mapStateToProps,
  {
    getCategoriesList,
    getMovieByCategory,
    getMovieByName,
    getMoviesList,
    clearMoviesList,
    getRandomMovie
  }
)(SearchPart);
