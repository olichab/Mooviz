import React, { Component } from "react";
import { connect } from "react-redux";

import { getCategoriesList, getPosterFilm } from "../actions/movieAction";

import "../scss/AddMovie.scss";

class AddMovie extends Component {
  state = {
    name: "",
    poster: "",
    category: "",
    synopsis: "",
    director: "",
    date: "",
    duration: ""
  };
  componentDidMount() {
    this.props.getCategoriesList();
  }

  updateForm = e => {
    const { name } = this.state;
    this.setState({
      [e.target.name]: e.target.value
    });
    if (name.length > 2) {
      this.props.getPosterFilm(name);
    }
  };

  updatePoster = e => {
    this.setState({
      poster: e.target.src
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("NEW ADD");
  };

  render() {
    const { categoriesList, posterMovie } = this.props;
    const { name } = this.state;

    return (
      <div className="AddMovie container p-5">
        <div className="row justify-content-center">
          <div className="col col-md-5">
            <form>
              <div className="form-group">
                <label htmlFor="form-nameMovie">Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="nameMovie"
                  placeholder="Ex: Dunkerque"
                  value={this.state.name}
                  name="name"
                  onChange={this.updateForm}
                />
              </div>
              <div className="poster-movies-container row justify-content-center">
                {posterMovie.results &&
                  posterMovie.results.map(
                    e =>
                      e.poster_path &&
                      name.length > 2 && (
                        <div
                          className="col col-md-6 col-lg-4 mb-4"
                          key={e.id}
                          value={this.state.poster}
                          onClick={this.updatePoster}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${
                              e.poster_path
                            }`}
                            alt="Movie poster"
                            className="poster-movie"
                            name="poster"
                          />
                        </div>
                      )
                  )}
              </div>
              <div className="form-group">
                <label htmlFor="select-category">Category</label>
                <select
                  className="custom-select"
                  id="select-category"
                  aria-label="Example select with button addon"
                  name="category"
                  onChange={this.updateForm}
                >
                  <option defaultValue>Choose a category...</option>
                  {categoriesList.length &&
                    categoriesList.map(e => (
                      <option key={e.id_category} value={e.name_category}>
                        {e.name_category}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="textarea-synopsis">Synopsis</label>
                <textarea
                  className="form-control"
                  id="textarea-synopsis"
                  rows="4"
                  name="synopsis"
                  value={this.state.synopsis}
                  onChange={this.updateForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-director">Director</label>
                <input
                  type="name"
                  className="form-control"
                  id="input-director"
                  placeholder="Ex: Christopher Nolan"
                  name="director"
                  value={this.state.director}
                  onChange={this.updateForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-date">Release date</label>
                <input
                  type="name"
                  className="form-control"
                  id="input-date"
                  placeholder="Ex: 2019-01-23"
                  name="date"
                  value={this.state.date}
                  onChange={this.updateForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-duration">Duration</label>
                <input
                  type="name"
                  className="form-control"
                  id="input-duration"
                  placeholder="Ex: 1H50"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.updateForm}
                />
              </div>
              <button type="button" className="btn btn-outline-success" onClick={this.handleSubmit}>
                Add new movie
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categoriesList: state.movieReducer.categoriesList,
  posterMovie: state.movieReducer.posterMovie
});

export default connect(
  mapStateToProps,
  {
    getCategoriesList,
    getPosterFilm
  }
)(AddMovie);
