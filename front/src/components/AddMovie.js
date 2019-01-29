import React, { Component } from "react";
import { connect } from "react-redux";
import convertMinsToHrsMins from "../helpers/convertMinsToHrsMins";

import {
  getCategoriesList,
  getPosterMovie,
  getInfosMovie,
  addMovie
} from "../actions/movieAction";

import "../scss/AddMovie.scss";

class AddMovie extends Component {
  state = {
    name: "",
    link_poster: "",
    category: "",
    synopsis: "",
    director: "",
    release_date: "",
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
      this.props.getPosterMovie(name);
    }
  };

  choosePoster = async e => {
    const { infosMovie } = this.props;
    const idMovie = e.target.id;
    const size = Object.keys(infosMovie).length;
    this.props.getInfosMovie(idMovie);

    if (size > 0) {
      let directors = [];
      infosMovie.credits.crew.map(e => {
        if (e.job === "Director") {
          directors.push(e.name);
        }
      });
      this.setState({
        name: e.target.name,
        link_poster: e.target.src,
        synopsis: infosMovie.overview,
        director: directors[0],
        release_date: infosMovie.release_date,
        duration: convertMinsToHrsMins(infosMovie.runtime)
      });
    }
  };

  handleSubmit = e => {
    const { addMovie } = this.props;
    addMovie(this.state);
    this.setState = ({
      name: "",
      link_poster: "",
      category: "",
      synopsis: "",
      director: "",
      release_date: "",
      duration: ""
    });
    window.location.reload();
  };

  render() {
    const { categoriesList, posterMovie, infosMovie } = this.props;
    const { name } = this.state;
    console.log(this.state);


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
                  name="name"
                  placeholder="Ex: Dunkirk"
                  value={this.state.name}
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
                          value={this.state.link_poster}
                          onClick={this.choosePoster}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/original/${
                              e.poster_path
                            }`}
                            alt="Movie poster"
                            className="poster-movie"
                            name={e.title}
                            id={e.id}
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
                  value={this.state.synopsis || ""}
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
                  value={this.state.director || ""}
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
                  value={this.state.release_date || ""}
                  onChange={this.updateForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="input-duration">Duration</label>
                <input
                  type="name"
                  className="form-control"
                  id="input-duration"
                  placeholder="(in minutes)"
                  name="duration"
                  value={this.state.duration || ""}
                  onChange={this.updateForm}
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-success"
                onClick={this.handleSubmit}
              >
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
  posterMovie: state.movieReducer.posterMovie,
  infosMovie: state.movieReducer.infosMovie
});

export default connect(
  mapStateToProps,
  {
    getCategoriesList,
    getPosterMovie,
    getInfosMovie,
    addMovie
  }
)(AddMovie);
