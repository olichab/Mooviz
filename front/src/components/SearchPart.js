import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getCategoriesList,
  getMovieByCategory,
  getMoviesList,
  getRandomMovie,
  getMovieByName
} from "../actions/movieAction";

import "../scss/SearchPart.scss";

class SearchPart extends Component {
  state = {
    searchName: ""
  };

  componentDidMount() {
    this.props.getCategoriesList();
  }

  handleSortByCategory = e => {
    const category = e.target.value;

    if (category==="Choose a category...") {
      this.handleShowAllMovies();
    } else {
      this.props.getMovieByCategory(category);
    }
  };

  handeChange = e => {
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

  handleShowAllMovies = e => {
    this.props.getMoviesList();
  };

  handleShowRandomMovie = () => {
    this.props.getRandomMovie();
  };

  render() {
    const { categoriesList } = this.props;

    return (
      <div className="SearchPart container p-3">
        <div className="row justify-content-center m-2">
          <div className="col col-md-6">
            <form onSubmit={this.handleSortByName}>
              <div className="input-group flex-nowrap">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="addon-wrapping"
                    role="img"
                    aria-label="icone search"
                  >
                    🔍
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search a film"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                  onChange={this.handeChange}
                  value={this.state.searchName}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center m-2">
          <div className="col col-md-6">
            <div className="input-group">
              <select
                className="custom-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
                onChange={this.handleSortByCategory}
              >
                <option defaultValue>Choose a category...</option>
                {categoriesList.length &&
                  categoriesList.map(e => (
                    <option key={e.id_category} value={e.name_category}>
                      {e.name_category}
                    </option>
                  ))}
              </select>
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary btnRandom"
                  type="button"
                  onClick={this.handleShowRandomMovie}
                >
                  Random movie
                </button>
                <button
                  className="btn btn-outline-secondary btnRandom"
                  type="button"
                  onClick={this.handleShowAllMovies}
                >
                  All movies
                </button>
              </div>
            </div>
          </div>
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
    getRandomMovie
  }
)(SearchPart);
